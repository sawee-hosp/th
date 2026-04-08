export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();

    const username = body.username || '';
    const password = body.password || '';

    const adminUser = env.ADMIN_USER;
    const adminPassword = env.ADMIN_PASSWORD;

    if (!adminUser || !adminPassword) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Server configuration error'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    if (username === adminUser && password === adminPassword) {
      return new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
      }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Invalid request'
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
