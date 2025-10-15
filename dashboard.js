// dashboard.js

// الاستيراد من ملف balance_logic.js
import { initBalanceDisplay } from './balance_logic.js'; 


// ---------------------------------------------
// وظائف الـ MODAL (الدايلوج)
// ---------------------------------------------

/**
 * دالة لإغلاق الـ Modal
 */
function closeCoursesDialog() {
    const overlay = document.getElementById('coursesModalOverlay');
    overlay.classList.remove('is-visible'); // استخدام الكلاس كما في HTML
    // تفريغ مصدر الـ iframe
    document.getElementById('dialogIframe').src = '';
    
    // إعادة الزر لوضعه الطبيعي إذا كان معطلاً
    const coursesBtn = document.getElementById('open-courses-btn');
    if(coursesBtn) {
        coursesBtn.innerHTML = '<i class="fas fa-graduation-cap"></i> اكتشف دوراتنا الآن';
        coursesBtn.disabled = false;
    }
}

/**
 * دالة لفتح الدايلوج (الـ Modal) وتحميل محتوى dialog.html فيه.
 */
function openCoursesDialog(finalMarketerId) {
    const overlay = document.getElementById('coursesModalOverlay');
    const iframe = document.getElementById('dialogIframe');
    const coursesBtn = document.getElementById('open-courses-btn');
    
    // 1. عرض حالة التحميل (UX Enhancement)
    if (coursesBtn) {
        coursesBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جارٍ التحميل...';
        coursesBtn.disabled = true;
    }

    // 2. بناء رابط ملف الدايلوج مع تمرير المعرف
    const dialogUrl = finalMarketerId ? `courses.html?id=${finalMarketerId}` : 'courses.html';
    
    // 3. إعداد وعرض النافذة
    iframe.src = ''; 
    overlay.classList.add('is-visible'); 
    
    // البدء بتحميل المحتوى
    iframe.src = dialogUrl; 

    // 4. إعادة الزر لوضعه الطبيعي بعد تحميل المحتوى
    iframe.onload = () => {
        if (coursesBtn) {
            coursesBtn.innerHTML = '<i class="fas fa-graduation-cap"></i> اكتشف دوراتنا الآن';
            coursesBtn.disabled = false;
        }
    };
    
    iframe.onerror = () => {
        if (coursesBtn) {
            coursesBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> خطأ! حاول مجدداً';
            coursesBtn.disabled = false;
        }
    };
}


// ---------------------------------------------
// وظائف تهيئة لوحة التحكم الرئيسية
// ---------------------------------------------

function initializeDashboard() {
    // 1. جلب ID المسوّق من الرابط (Marketer ID Logic)
    const urlParams = new URLSearchParams(window.location.search);
    const marketerIdFromURL = urlParams.get('id') || urlParams.get('marketer_id');

    // إذا لم يتم العثور على ID في الرابط، استخدم قيمة تجريبية
    const defaultMarketerId = 'FVAPOW40'; 
    const finalMarketerId = marketerIdFromURL || defaultMarketerId; 

    // 2. عرض الـ ID في الهيدر
    const idDisplayElement = document.getElementById('marketer-id-display');
    if (idDisplayElement) {
        idDisplayElement.innerHTML = `معرّفك: <span class="id-highlight">${finalMarketerId}</span>`;
    }

    // 3. ربط زر اكتشاف الدورات (يجب إضافة ID للزر في HTML)
    const coursesBtn = document.querySelector('.courses-btn');
    if (coursesBtn) {
        // نعطي الزر ID ليسهل التعامل معه
        coursesBtn.id = 'open-courses-btn'; 
        // نزيل الـ onclick القديم ونربط بالـ addEventListener
        coursesBtn.onclick = null; 
        coursesBtn.addEventListener('click', () => openCoursesDialog(finalMarketerId));
    }
    
    // 4. ربط زر إغلاق الـ Modal ومفتاح ESC
    const closeModalBtn = document.getElementById('closeModalBtn');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeCoursesDialog);
    }
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && document.getElementById('coursesModalOverlay').classList.contains('is-visible')) {
            closeCoursesDialog();
        }
    });


    // 5. استدعاء دالة جلب وعرض الرصيد الجديدة
    initBalanceDisplay(finalMarketerId);
    
    // 6. محاكاة إظهار لوحة التحكم
    setTimeout(() => {
        const statusMsg = document.getElementById('statusMessage');
        const dashboard = document.getElementById('dashboardContent');
        if (statusMsg) statusMsg.style.display = 'none';
        if (dashboard) dashboard.style.display = 'block';
    }, 1500); 
    
    // 7. استدعاء وظائف التهيئة الأخرى
    if (typeof initPlaceholderChart === 'function') {
        initPlaceholderChart(); 
    }
}

// استدعاء وظيفة التهيئة عند تحميل الصفحة بالكامل
window.addEventListener('load', initializeDashboard);
