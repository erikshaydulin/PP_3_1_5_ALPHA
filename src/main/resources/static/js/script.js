// Получить данные пользователя с помощью Fetch API
function getUserForHeader() {
    fetch('admin/api/userForHeader')
        .then(response => response.json())
        .then(data => {
            // Заполнить элементы с данными пользователя
            document.getElementById('name').innerText = data.name;
            document.getElementById('surname').innerText = data.surname;

            // Формирование строки ролей
            const roles = data.roles.map(role => role.name.replace('ROLE_', '')); // Удалить префикс "ROLE_"
            document.getElementById('roles').innerText = roles.join(' '); // Объединить имена ролей с пробелом между ними
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

// Вызвать функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    getUserForHeader();
});