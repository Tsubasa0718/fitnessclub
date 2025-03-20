document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("js-modal");
    const closeBtn = document.getElementById("js-modal-close");
    const modalLink = document.querySelector(".c-modal__link");

    // モーダル内のフォーカス可能な要素を取得（ボタンとリンク）
    const getFocusableElements = () => [closeBtn, modalLink];

    // モーダルを開く処理
    const showModal = (selector, duration = 500) => {
        const modal = document.querySelector(selector);
        if (modal) {
            modal.style.visibility = "visible";
            modal.style.opacity = "1";
            modal.style.transition = `opacity ${duration}ms ease-in-out`;
            modal.setAttribute("aria-hidden", "false");

            // モーダルを開いたら最初のフォーカス可能な要素にフォーカス
            setTimeout(() => {
                closeBtn.focus();
            }, duration);
        }
    };

    // モーダルを閉じる処理
    const hideModal = (selector, duration = 500) => {
        const modal = document.querySelector(selector);
        if (modal) {
            modal.style.opacity = "0";
            modal.style.transition = `opacity ${duration}ms ease-in-out`;
            modal.setAttribute("aria-hidden", "true");

            setTimeout(() => {
                modal.style.visibility = "hidden";
            }, duration);
        }
    };

    // 2秒後にモーダルを表示
    setTimeout(() => {
        showModal(".c-modal", 500);
    }, 2000);

    // 閉じるボタンのクリックイベント
    closeBtn.addEventListener("click", () => {
        hideModal(".c-modal", 500);
    });

    // フォーカスのループ処理
    document.addEventListener("keydown", (event) => {
        if (modal.getAttribute("aria-hidden") === "false") {
            const focusableElements = getFocusableElements();
            const firstFocusableElement = focusableElements[0];
            const lastFocusableElement = focusableElements[focusableElements.length - 1];

            if (event.key === "Tab") {
                if (event.shiftKey && document.activeElement === firstFocusableElement) {
                    event.preventDefault();
                    lastFocusableElement.focus();
                } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
                    event.preventDefault();
                    firstFocusableElement.focus();
                }
            }

            // Escapeキーでモーダルを閉じる
            if (event.key === "Escape") {
                hideModal(".c-modal", 500);
            }
        }
    });

    // **モーダル内の要素以外にフォーカスが移動したら強制的に `closeBtn` に戻す**
    modal.addEventListener("focusout", (event) => {
        if (modal.getAttribute("aria-hidden") === "false") {
            const focusableElements = getFocusableElements();
            if (!focusableElements.includes(event.relatedTarget)) {
                event.preventDefault();
                closeBtn.focus();
            }
        }
    });
});
