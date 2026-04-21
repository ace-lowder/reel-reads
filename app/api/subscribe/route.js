const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function jsonResponse(body, status = 200) {
  return Response.json(body, { status });
}

function isDuplicateSubscriber(payloadText) {
  return /already|exists|subscribed|duplicate/i.test(payloadText);
}

export async function POST(request) {
  const token = process.env.MAILERLITE_API_TOKEN;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!token || !groupId) {
    return jsonResponse({ error: "server_misconfigured" }, 500);
  }

  let payload;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "invalid_json" }, 400);
  }

  const email = typeof payload?.email === "string" ? payload.email.trim() : "";
  const website =
    typeof payload?.website === "string"
      ? payload.website.trim()
      : typeof payload?.company === "string"
        ? payload.company.trim()
        : "";

  if (website) {
    return jsonResponse({ ok: true });
  }

  if (!emailRegex.test(email)) {
    return jsonResponse({ error: "invalid_email" }, 400);
  }

  try {
    const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        groups: [groupId],
      }),
    });

    if (response.ok) {
      return jsonResponse({ ok: true });
    }

    const errorText = await response.text().catch(() => "");

    if (isDuplicateSubscriber(errorText) || response.status === 409) {
      return jsonResponse({ ok: true });
    }

    return jsonResponse({ error: "subscribe_failed" }, 500);
  } catch {
    return jsonResponse({ error: "subscribe_failed" }, 500);
  }
}

export function GET() {
  return jsonResponse({ error: "method_not_allowed" }, 405);
}
