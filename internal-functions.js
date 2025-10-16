// دالة JavaScript المعدلة لفتح النافذة
function openCoursesDialog() {
    const overlay = document.getElementById('coursesModalOverlay');
    const iframe = document.getElementById('dialogIframe');
    const coursesBtn = document.querySelector('.courses-btn');
    
    // 1. عرض حالة التحميل (UX Enhancement)
    coursesBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جارٍ التحميل...';
    coursesBtn.disabled = true;

    // 2. إعداد وعرض النافذة
    iframe.src = ''; 
    // **تعديل حاسم: إضافة الكلاس لعرض النافذة**
    overlay.classList.add('is-visible'); 
    
    // البدء بتحميل المحتوى
    iframe.src = 'courses.html'; 

    // 3. إعادة الزر لوضعه الطبيعي بعد تحميل المحتوى
    iframe.onload = () => {
        coursesBtn.innerHTML = '<i class="fas fa-graduation-cap"></i> اكتشف دوراتنا الآن';
        coursesBtn.disabled = false;
    };
    
    iframe.onerror = () => {
        coursesBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> خطأ! حاول مجدداً';
        coursesBtn.disabled = false;
    };
}

// دالة جديدة لإغلاق النافذة
function closeCoursesDialog() {
    const overlay = document.getElementById('coursesModalOverlay');
    overlay.classList.remove('is-visible');
    // إيقاف تحميل المحتوى داخل الـ iframe
    document.getElementById('dialogIframe').src = ''; 
}

// ربط زر الإغلاق بالدالة الجديدة
document.getElementById('closeModalBtn').onclick = closeCoursesDialog;


// دالة وهمية للتبديل بين الوضع الليلي والنهاري (تتطلب تنفيذاً في JS)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('theme-toggle').querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        document.getElementById('theme-toggle').title = 'تبديل الوضع النهاري';
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        document.getElementById('theme-toggle').title = 'تبديل الوضع الليلي';
    }
}

// دالة وهمية لتطبيق الفلترة المتقدمة (تتطلب تنفيذاً في JS)
function applyAdvancedFilter() {
    console.log("Applying advanced filters...");
    // هذا يحتاج منطق في ملفات JS الخارجية
}

// دالة افتراضية موجودة في الكود الأصلي
function filterReferrals() {
    console.log("Filtering referrals...");
    // هذا يحتاج منطق في ملفات JS الخارجية
}


// دالة تهيئة مخطط بياني وهمي (Placeholder Chart)
function initPlaceholderChart() {
    const ctx = document.getElementById('referral-pie-chart');
    
    // التأكد من وجود العنصر
    if (!ctx) return; 

    // إزالة رسالة الـ Placeholder بمجرد تهيئة المخطط
    const placeholderMessage = document.querySelector('#analytics-charts p');
    if (placeholderMessage) {
        placeholderMessage.style.display = 'none';
    }

    // بيانات وهمية (Dummy Data) لضمان ظهور المخطط
    const dummyData = {
        labels: ['مسجلون نشطون (Y)', 'مسجلون غير نشطين/معلقين (N/P)'],
        datasets: [{
            data: [5, 2], // 5 نشطين و 2 غير نشطين كمثال
            backgroundColor: [
                '#0d3b14', // اللون الأخضر (Primary)
                '#e5a72d'  // اللون الذهبي (Secondary)
            ],
            hoverOffset: 10
        }]
    };

    // تهيئة المخطط (يتطلب Chart.js)
    try {
        // تأكد من تحميل Chart
        if (typeof Chart !== 'undefined') {
            new Chart(ctx, {
                type: 'doughnut', 
                data: dummyData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                font: {
                                    family: 'Tajawal',
                                    size: 14
                                }
                            }
                        }
                    }
                }
            });
        }
    } catch (e) {
        console.error("Error initializing Chart:", e);
    }
}


// إزالة محتوى window.onload الأصلي الذي يتعارض مع ملف dashboard.js
// ستتم إدارة التهيئة بواسطة dashboard.js الآن.

