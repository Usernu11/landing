document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    const submitButton = document.querySelector('button[type="submit"]');
    const phoneInput = document.querySelector('input[name="tel"]');

    // Загружаем массив отправленных номеров
    let submittedPhones = JSON.parse(localStorage.getItem('submittedPhones')) || [];

    // Проверяем текущий номер при загрузке
    if (submittedPhones.includes(phoneInput.value)) {
        disableSubmitButton();
    }

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        
        // Проверка чекбокса
        const checkbox = document.getElementById('policy');
        if (!checkbox.checked) {
            alert('Пожалуйста, примите условия политики конфиденциальности');
            return;
        }

        const currentPhone = phoneInput.value.trim();
        
        // Обновляем массив из localStorage (на случай изменений в других вкладках)
        submittedPhones = JSON.parse(localStorage.getItem('submittedPhones')) || [];

        // Проверка на повторную отправку
        if (submittedPhones.includes(currentPhone)) {
            alert('Вы уже отправили форму с этим номером телефона.');
            return;
        }

        submitButton.disabled = true;

        try {
            const response = await fetch('https://order.drcash.sh/v1/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer RLPUUOQAMIKSAB2PSGUECA'
                },
                body: JSON.stringify({
                    stream_code: 'vv4uf',
                    client: {
                        phone: currentPhone,
                        name: document.querySelector('input[name="name"]').value.trim()
                    }
                })
            });

            if (!response.ok) throw new Error('Ошибка сети');

            const data = await response.json();
            if (data.uuid) {
                // Добавляем номер в массив и сохраняем
                submittedPhones.push(currentPhone);
                localStorage.setItem('submittedPhones', JSON.stringify(submittedPhones));
                window.location.href = 'thank-you.html';
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке формы');
            submitButton.disabled = false;
        }
    });

    function disableSubmitButton() {
        submitButton.disabled = true;
        submitButton.textContent = 'Форма уже отправлена';
        submitButton.style.backgroundColor = '#ccc';
    }
});