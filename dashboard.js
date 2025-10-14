// --- في ملف dashboard.js ---

/**
 * دالة لفتح الدايلوج (الـ Modal) وتحميل محتوى dialog.html فيه.
 */
function openCoursesDialog() {
    // 1. استخلاص معرف المسوق من رابط لوحة التحكم
    const urlParams = new URLSearchParams(window.location.search);
    const marketerId = urlParams.get('marketer_id') || urlParams.get('id');
    
    // 2. بناء رابط ملف الدايلوج مع تمرير المعرف
    let dialogUrl = 'dialog.html'; 
    if (marketerId) {
        dialogUrl += `?id=${marketerId}`; 
    }
    
    // 3. تحديد عناصر الـ Modal
    const modal = document.getElementById('coursesModalOverlay');
    const iframe = document.getElementById('dialogIframe');
    
    // 4. تعيين مصدر الـ iframe وإظهار الـ Modal
    iframe.src = dialogUrl;
    modal.style.display = 'flex';
}

/**
 * دالة لإغلاق الـ Modal
 */
function closeCoursesDialog() {
    const modal = document.getElementById('coursesModalOverlay');
    modal.style.display = 'none';
    // تفريغ مصدر الـ iframe
    document.getElementById('dialogIframe').src = '';
}

// 5. تهيئة زر الإغلاق عند تحميل لوحة التحكم (مستمع الحدث)
document.addEventListener('DOMContentLoaded', () => {
    const closeModalBtn = document.getElementById('closeModalBtn');
    if (closeModalBtn) {
        // ربط زر الإغلاق في الـ Modal بالدالة
        closeModalBtn.addEventListener('click', closeCoursesDialog);
    }
    
    // لإغلاق الـ Modal عند الضغط على مفتاح ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && document.getElementById('coursesModalOverlay').style.display === 'flex') {
            closeCoursesDialog();
        }
    });
});
