// balance_logic.js

// **!! ضع رابط Apps Script المنشور هنا !!**
// مثال: const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfy.../exec';
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwyQa_Zub2il_bl9tAx58gywUiVRlatu2DNx1CBgrcmAuimejKwi7GlGfTxtZMf0wdX5g/exec'; 

/**
 * وظيفة حقيقية لجلب الرصيد الحالي (العمولة) من Google Apps Script.
 *
 * @param {string} marketerId - معرّف المسوّق لجلب رصيده.
 * @returns {Promise<number>} - تتعهد بإرجاع قيمة الرصيد.
 */
function fetchCurrentBalance(marketerId) {
    console.log(`[Balance Logic] Attempting to fetch balance for ID: ${marketerId} using Apps Script...`);
    
    // بناء الرابط بالـ ID كمعامل (parameter) باستخدام 'marketer_id' ليتوافق مع كود Apps Script
    const url = `${APPS_SCRIPT_URL}?marketer_id=${marketerId}`;

    return fetch(url)
        .then(response => {
            // Apps Script يعيد دائماً استجابة HTTP 200، لذا نفحص محتوى الـ JSON
            if (!response.ok) {
                // قد يحدث خطأ نادر هنا إذا كانت هناك مشكلة في الشبكة نفسها
                 throw new Error(`Network Error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                // التعامل مع الأخطاء المرسلة من كود Apps Script (مثل "Marketer not found")
                throw new Error(`Apps Script Error: ${data.error}`);
            }
            
            // نستخدم 'balance' لأنه الاسم الذي أرجعناه في Apps Script ليمثل العمولة
            const balanceValue = parseFloat(data.balance); 
            if (isNaN(balanceValue)) {
                 // إذا لم تكن القيمة رقماً صالحاً
                throw new Error("Received balance is not a valid number.");
            }
            
            console.log(`[Balance Logic] Balance fetched successfully: $${balanceValue}`);
            return balanceValue;
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
            // في حالة الخطأ أو التحميل
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
 * يجب أن تستدعى هذه الدالة من ملف dashboard.js.
 * @param {string} marketerId - معرّف المسوّق.
 */
export function initBalanceDisplay(marketerId) {
    // 1. عرض حالة التحميل (إذا كانت القيمة الأولية صفراً)
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
