console.log('JS файл подключен')

// Получить данные пользователя с помощью Fetch API
function getUserForHeader() {
    fetch('admin/api/userForHeader')
        .then(response => response.json())
        .then(data => {
            // Заполнить элементы с данными пользователя
            document.getElementById('sessionName').innerText = data.name;
            document.getElementById('sessionSurname').innerText = data.surname;

            // Формирование строки ролей
            const roles = data.roles.map(role => role.name.replace('ROLE_', '')); // Удалить префикс "ROLE_"
            document.getElementById('roles').innerText = roles.join(' '); // Объединить имена ролей с пробелом между ними

            // Проверка ролей и отображение соответствующих пунктов меню
            if (data.roles.includes('ROLE_ADMIN')) {
                document.getElementById('adminMenuItem').classList.remove('d-none');
            }
            if (data.roles.includes('ROLE_USER')) {
                document.getElementById('userMenuItem').classList.remove('d-none');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

// Вызвать функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    getUserForHeader();
});

// Вызвать функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    getUserForHeader();
});


// Функция для получения списка пользователей с помощью Fetch API
function getUsers() {
    fetch('/admin/api/users')
        .then(response => response.json())
        .then(data => {
            const usersTableBody = document.querySelector('#usersTable tbody');
            usersTableBody.innerHTML = ''; // Очистить текущее содержимое таблицы

            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.surname}</td>
                    <td>${user.department}</td>
                    <td>${user.salary}</td>
                    <td>
                        <form method="PATCH" action="/admin/updateInfo">
                            <input type="hidden" name="userId" value="${user.id}"/>
                            <input type="submit" class="update-button" value="Изменить"/>
                        </form>
                        <br>
                        <form method="DELETE" action="/admin/deleteUser">
                            <input type="hidden" name="userId" value="${user.id}"/>
                            <input type="submit" class="delete-button" value="Удалить"/>
                        </form>
                    </td>
                `;

                usersTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

// Вызов функции для получения пользователей при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    getUsers();
});

//______________________________________________________________________________________



// JavaScript-код для управления активной вкладкой - Пока отключил, некорректная работа.

// document.addEventListener("DOMContentLoaded", function() {
//     const activeTab = sessionStorage.getItem("activeTab");
//
//     if (activeTab === "newUser") {
//         document.getElementById("listUsers-tab").classList.remove("active");
//         document.getElementById("listUsers-tab-pane").classList.remove("active", "show");
//
//         document.getElementById("newUser-tab").classList.add("active");
//         document.getElementById("newUser-tab-pane").classList.add("active", "show");
//     } else {
//         // Проверяем, был ли пользователь успешно создан
//         const userCreated = sessionStorage.getItem("userCreated");
//         if (userCreated === "true") {
//             // Устанавливаем активную вкладку в "User table"
//             document.getElementById("newUser-tab").classList.remove("active");
//             document.getElementById("newUser-tab-pane").classList.remove("active", "show");
//
//             document.getElementById("listUsers-tab").classList.add("active");
//             document.getElementById("listUsers-tab-pane").classList.add("active", "show");
//         }
//     }
// });
//
// document.getElementById("listUsers-tab").addEventListener("click", function() {
//     sessionStorage.setItem("activeTab", "listUsers");
// });
//
// document.getElementById("newUser-tab").addEventListener("click", function() {
//     sessionStorage.setItem("activeTab", "newUser");
// });
//
//




