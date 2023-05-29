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

function delPrefix() {
    const roleCells = document.querySelectorAll(".tableD tbody td:nth-child(5)"); // Выбираем все ячейки с ролями

    roleCells.forEach(function (cell) {
        let roles = cell.textContent.trim().split(","); // Получаем список ролей из содержимого ячейки
        let cleanedRoles = roles.map(function (role) {
            return role.replace("ROLE_", ""); // Удаляем префикс "ROLE_" из каждой роли
        });
        cell.textContent = cleanedRoles.join(" "); // Заменяем содержимое ячейки на очищенные роли
    });
}


// Вызов функции для получения пользователей при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // getUsers();
    delPrefix();
    getUserForHeader();
});

document.addEventListener("DOMContentLoaded", function () {
    var roleCells = document.querySelectorAll(".tableD tbody td:nth-child(5)"); // Выбираем все ячейки с ролями

    roleCells.forEach(function (cell) {
        var roles = cell.textContent.trim().split(","); // Получаем список ролей из содержимого ячейки
        var cleanedRoles = roles.map(function (role) {
            return role.replace("ROLE_", ""); // Удаляем префикс "ROLE_" из каждой роли
        });
        cell.textContent = cleanedRoles.join(", "); // Заменяем содержимое ячейки на очищенные роли
    });
});


//______________________________________________________________________________________
// Обработчик события отправки формы


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




