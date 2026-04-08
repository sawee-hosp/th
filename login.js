export async function onRequestPost(context) {
    try {
        // 1. รับข้อมูล username และ password ที่หน้าเว็บ (HTML) ส่งมาให้
        const body = await context.request.json();
        const { username, password } = body;

        // 2. ดึงรหัสผ่านตัวจริงที่ซ่อนไว้ในตั้งค่าของ Cloudflare (Environment Variables)
        const validUser = context.env.SECRET_USERNAME;
        const validPass = context.env.SECRET_PASSWORD;

        // 3. ตรวจสอบว่าตรงกันไหม
        if (username === validUser && password === validPass) {
            // รหัสถูก: ส่งสัญญาณ "ผ่าน" กลับไป
            return new Response(JSON.stringify({ success: true, message: 'เข้าสู่ระบบสำเร็จ' }), {
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            // รหัสผิด: ส่งสัญญาณ "ไม่ผ่าน" กลับไป
            return new Response(JSON.stringify({ success: false, message: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (err) {
        // เกิดข้อผิดพลาดในการส่งข้อมูล
        return new Response(JSON.stringify({ success: false, message: 'เกิดข้อผิดพลาดในการเชื่อมต่อ' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
