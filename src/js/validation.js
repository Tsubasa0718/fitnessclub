const Form = document.getElementById('js-form');

const fields = [
    { element: document.getElementById('name'), errorElement: document.getElementById('error-name'), errorMessage: '※お名前を記入してください' },
    { element: document.getElementById('email'), errorElement: document.getElementById('error-email'), errorMessage: '※メールアドレスを記入してください' },
    { element: document.getElementById('tel'), errorElement: document.getElementById('error-tel'), errorMessage: '※電話番号を記入してください' }
];

// フォームが存在する場合のみ処理を実行
if (Form) {
    Form.addEventListener('submit', (e) => {
        e.preventDefault();
        let formIsValid = true; // フォームの有効性フラグ

        fields.forEach((field) => {
            if (field.element && field.errorElement) { // 要素とエラー要素が存在する場合のみ処理
                const inputElement = field.element;
                const errorElement = field.errorElement;

                if (inputElement.value.trim() === '') {
                    errorElement.textContent = field.errorMessage;
                    errorElement.classList.add('p-error');
                    inputElement.classList.add('error');
                    formIsValid = false;
                } else {
                    errorElement.textContent = ''; // エラーメッセージを消す
                    errorElement.classList.remove('p-error');
                    inputElement.classList.remove('error');
                }
            }
        });

        if (formIsValid) {
            console.log('フォームは有効です。送信します。');
            // フォーム送信処理（例：フォームのリセット）
            Form.submit();
        } else {
            console.error('フォームにエラーがあります。');
        }
    });
} else {
    console.warn('Form element with id "js-form" not found on this page.');
}
