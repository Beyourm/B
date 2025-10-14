/**
 * دالة لفتح ملف dialog.html كـ Modal وتمرير معرّف المسوق إليه.
 */
function openCoursesDialog() {
    // 1. استخلاص معرف المسوق من رابط لوحة التحكم
    const urlParams = new URLSearchParams(window.location.search);
    // نفترض أن معرّف المسوِّق موجود في لوحة التحكم تحت 'id' أو 'marketer_id'
    const marketerId = urlParams.get('marketer_id') || urlParams.get('id');

    // 2. بناء رابط ملف الدايلوج مع تمرير المعرف
    let dialogUrl = 'dialog.html'; 
    
    if (marketerId) {
        // نستخدم 'id' لتمرير المعرف إلى صفحة dialog.html ليتم استخدامه هناك
        dialogUrl += `?id=${marketerId}`; 
    }
    
    // 3. فتح النافذة المنبثقة
    // 'CoursesDialog' هو اسم النافذة، والمعلمات تحدد حجمها وخصائصها
    window.open(dialogUrl, 'CoursesDialog', 'width=450,height=550,scrollbars=yes,resizable=yes');
}
