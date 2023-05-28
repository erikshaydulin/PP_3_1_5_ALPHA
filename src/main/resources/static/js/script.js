console.log('JS файл подключен')
// Получить данные пользователя с помощью Fetch API
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

// function createUser() {
//     const form = document.getElementById('newUserForm');
//     const name = document.getElementById('name').value;
//     const surname = document.getElementById('surname').value;
//     const department = document.getElementById('department').value;
//     const salary = document.getElementById('salary').value;
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
//
//     const newUser = {
//         name: name,
//         surname: surname,
//         department: department,
//         salary: salary,
//         username: username,
//         password: password
//     };
//
//     fetch('/admin/saveUser', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newUser)
//     })
//         .then(response => {
//             if (response.ok) {
//                 // Перезагрузка страницы после успешного сохранения пользователя
//                 location.reload();
//             } else {
//                 throw new Error('Ошибка при сохранении пользователя.');
//             }
//         })
//         .catch(error => {
//             console.error('Ошибка:', error);
//         });
// }
//
// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById('newUserForm');
//     form.addEventListener('submit', function(event) {
//         event.preventDefault();
//         createUser();
//     });
//
//     const addButton = document.getElementById('addUserButton');
//     addButton.addEventListener('click', function() {
//         createUser();
//         form.reset();
//     });
// });



