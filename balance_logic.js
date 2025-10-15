// balance_logic.js

/**
 * وظيفة وهمية (Mock Function) لجلب الرصيد الحالي من خادم خارجي.
 * يجب استبدال هذه الوظيفة باتصال AJAX/Fetch API حقيقي للخادم (مثل Axios أو Fetch).
 *
 * @param {string} marketerId - معرّف المسوّق لجلب رصيده.
 * @returns {Promise<number>} - تتعهد بإرجاع قيمة الرصيد.
 */
function fetchCurrentBalance(marketerId) {
    console.log(`[Balance Logic] Attempting to fetch balance for ID: ${marketerId}`);
    
    // محاكاة جلب البيانات مع تأخير زمني (Delay)
    return new Promise((resolve) => {
        // يمكن أن يتغير الرصيد بناءً على ID، لكن هنا سنستخدم قيمة ثابتة للمثال
        const mockBalance = 1500; 

        setTimeout(() => {
            // هنا يجب أن يتم جلب البيانات الحقيقية من الخادم
            console.log(`[Balance Logic] Balance fetched successfully: $${mockBalance}`);
            resolve(mockBalance);
        }, 800); // تأخير 800 مللي ثانية لمحاكاة الاتصال بالشبكة
    });
}

/**
 * وظيفة لتحديث بطاقة الرصيد في واجهة المستخدم.
 * @param {number} balance - قيمة الرصيد المراد عرضه.
 */
function updateBalanceUI(balance) {
    const balanceElement = document.getElementById('current-balance');
    if (balanceElement) {
        // تنسيق القيمة (يمكنك استخدام Intl.NumberFormat لتنسيق العملة بشكل أفضل)
        balanceElement.textContent = balance.toLocaleString('en-US'); 
        
        // إزالة حالة التحميل
        const card = balanceElement.closest('.stats-card');
        if (card) {
            // إزالة كلاس skeleton-card بعد التحميل
            card.classList.remove('skeleton-card'); 
        }
    }
}

/**
 * وظيفة رئيسية لبدء عملية جلب وعرض الرصيد.
 * يجب أن تستدعى هذه الدالة بعد التأكد من جلب marketerId.
 * @param {string} marketerId - معرّف المسوّق.
 */
export function initBalanceDisplay(marketerId) {
    // 1. عرض حالة التحميل (للتأكد من أن البيانات لم يتم جلبها بعد)
    const balanceElement = document.getElementById('current-balance');
    if (balanceElement) {
        balanceElement.textContent = '...'; // عرض نقطة التحميل
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


// تصدير دالة جلب الرصيد في حالة الحاجة إليها في ملفات أخرى
// يمكنك إزالة هذا الجزء إذا كنت لن تستخدمها خارج هذا الملف
export { fetchCurrentBalance }; 
