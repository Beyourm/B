// balance_logic.js

/**
 * وظيفة وهمية (Mock Function) لجلب الرصيد الحالي من خادم خارجي.
 * يجب استبدال هذه الوظيفة باتصال AJAX/Fetch API حقيقي للخادم.
 *
 * @param {string} marketerId - معرّف المسوّق لجلب رصيده.
 * @returns {Promise<number>} - تتعهد بإرجاع قيمة الرصيد.
 */
function fetchCurrentBalance(marketerId) {
    console.log(`[Balance Logic] Attempting to fetch balance for ID: ${marketerId}`);
    
    // محاكاة جلب البيانات مع تأخير زمني (Delay)
    return new Promise((resolve) => {
        // قيمة الرصيد الافتراضية
        const mockBalance = 2456.75; 

        setTimeout(() => {
            console.log(`[Balance Logic] Balance fetched successfully: $${mockBalance}`);
            resolve(mockBalance);
        }, 800); 
    });
}

/**
 * وظيفة لتحديث بطاقة الرصيد في واجهة المستخدم.
 * @param {number|string} balance - قيمة الرصيد المراد عرضه.
 */
function updateBalanceUI(balance) {
    const balanceElement = document.getElementById('current-balance');
    if (balanceElement) {
        let displayValue;
        
        if (typeof balance === 'number') {
            // تنسيق القيمة (مع فصل آلاف وعرض رقمين بعد الفاصلة)
            displayValue = balance.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }); 
        } else {
            // في حالة الخطأ
            displayValue = balance;
        }

        balanceElement.textContent = displayValue; 
        
        // إزالة حالة التحميل (Skeleton) من البطاقة الأبوية
        const card = balanceElement.closest('.stats-card');
        if (card && card.classList.contains('skeleton-card')) {
            card.classList.remove('skeleton-card'); 
        }
    }
}

/**
 * وظيفة رئيسية لبدء عملية جلب وعرض الرصيد.
 * @param {string} marketerId - معرّف المسوّق.
 */
export function initBalanceDisplay(marketerId) {
    // 1. عرض حالة التحميل (إذا لم يكن الـ Skeleton مرئياً بعد)
    const balanceElement = document.getElementById('current-balance');
    if (balanceElement && balanceElement.textContent.trim() === '0') {
         balanceElement.textContent = '...'; 
    }

    // 2. جلب الرصيد
    fetchCurrentBalance(marketerId)
        .then(balance => {
            // 3. تحديث واجهة المستخدم بالرصيد
            updateBalanceUI(balance);
        })
        .catch(error => {
            console.error("[Balance Logic] Failed to fetch balance:", error);
            // عرض رسالة خطأ في حال فشل الجلب
            updateBalanceUI('خطأ');
        });
}
