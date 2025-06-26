// js/main.js
import { todos, users } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop();

  if (currentPage === 'index.html' || currentPage === '') {

    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // 유효성 검사
        if (!email || !password) {
          errorMessage.textContent = '모든 항목을 입력해주세요.';
          return;
        }

        // 사용자 검증 
        const foundUser = users.find(user => user.email === email && user.password === password);

        if (foundUser) {
          localStorage.setItem('currentUser', JSON.stringify({ email: foundUser.email }));
          window.location.href = 'todo.html'; // 로그인 성공 시 todo.html로 이동
        } else {
          errorMessage.textContent = '잘못된 이메일 또는 비밀번호입니다.';
        }
      });
    }
  } else if (currentPage === 'todo.html') {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      window.location.href = 'index.html'; // 로그인하지 않은 이동
      return;
    }

    const user = JSON.parse(currentUser);
    const userDisplay = document.getElementById('userDisplay');
    if (userDisplay) {
      userDisplay.textContent = `${user.email}님 환영합니다!`;
    }

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
      });
    }

    const todoListContainer = document.getElementById('todoList');
    const addTodoForm = document.getElementById('addTodoForm');
    const filterAllBtn = document.getElementById('filterAll');
    const filterCompletedBtn = document.getElementById('filterCompleted');
    const filterIncompleteBtn = document.getElementById('filterIncomplete');

    let currentTodos = [...todos];
    let currentFilter = 'all'; // 필터 기본 값

    // ToDo 항목 렌더링 함수
    const renderTodos = (filter = 'all') => {
      todoListContainer.innerHTML = ''; // 기존 목록 초기화
      let filteredTodos = [];

      if (filter === 'all') {
        filteredTodos = currentTodos;
      } else if (filter === 'completed') {
        filteredTodos = currentTodos.filter(todo => todo.isCompleted);
      } else if (filter === 'incomplete') {
        filteredTodos = currentTodos.filter(todo => !todo.isCompleted);
      }

      if (filteredTodos.length === 0) {
        todoListContainer.innerHTML = '<p class="col-12 text-center text-muted">표시할 할 일이 없습니다.</p>';
        return;
      }

      filteredTodos.forEach(todo => {
        const colDiv = document.createElement('div');
        colDiv.className = 'col';
        colDiv.innerHTML = `
                    <div class="card h-100 shadow-sm ${todo.isCompleted ? 'todo-completed' : ''}">
                        <div class="card-body">
                            <h5 class="card-title ${todo.isCompleted ? 'text-decoration-line-through text-muted' : ''}">${todo.title}</h5>
                            ${todo.description ? `<p class="card-text description text-muted">${todo.description}</p>` : ''}
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="badge ${todo.isCompleted ? 'bg-success' : 'bg-warning text-dark'}">
                                    ${todo.isCompleted ? '<i class="fas fa-check-circle"></i> 완료' : '<i class="fas fa-hourglass-half"></i> 미완료'}
                                </span>
                                <div class="form-check form-switch">
                                    <input class="form-check-input todo-toggle-completion" type="checkbox" id="toggle-${todo.id}" ${todo.isCompleted ? 'checked' : ''} data-todo-id="${todo.id}">
                                    <label class="form-check-label" for="toggle-${todo.id}">상태 변경</label>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
        todoListContainer.appendChild(colDiv);
      });

      // 체크박스 이벤트 리스너 재등록
      document.querySelectorAll('.todo-toggle-completion').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
          const todoId = parseInt(e.target.dataset.todoId);
          const todoIndex = currentTodos.findIndex(todo => todo.id === todoId);
          if (todoIndex > -1) {
            currentTodos[todoIndex].isCompleted = e.target.checked;
            renderTodos(currentFilter); // 상태 변경 후 다시 렌더링
          }
        });
      });
    };

    // 초기 렌더링
    renderTodos(currentFilter);

    // 할 일 추가 폼 제출 이벤트
    addTodoForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('todoTitle').value;
      const description = document.getElementById('todoDescription').value;
      const isCompleted = document.getElementById('todoIsCompleted').checked;

      if (!title) {
        alert('제목을 입력해주세요.');
        return;
      }

      const newId = currentTodos.length > 0 ? Math.max(...currentTodos.map(todo => todo.id)) + 1 : 1;

      const newTodo = {
        id: newId,
        title: title,
        description: description,
        isCompleted: isCompleted
      };

      currentTodos.push(newTodo);
      renderTodos(currentFilter); // 새로운 항목 추가 후 렌더링

      // 폼 초기화
      addTodoForm.reset();
      // 모달 닫기
      const addTodoModal = bootstrap.Modal.getInstance(document.getElementById('addTodoModal'));
      if (addTodoModal) {
        addTodoModal.hide();
      }
    });

    // 필터 버튼 이벤트
    const filterButtons = [filterAllBtn, filterCompletedBtn, filterIncompleteBtn];

    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        filterButtons.forEach(btn => btn.classList.remove('active')); // 모든 버튼에서 active 클래스 제거
        e.target.classList.add('active'); // 클릭된 버튼에 active 클래스 추가

        if (e.target.id === 'filterAll') {
          currentFilter = 'all';
        } else if (e.target.id === 'filterCompleted') {
          currentFilter = 'completed';
        } else if (e.target.id === 'filterIncomplete') {
          currentFilter = 'incomplete';
        }
        renderTodos(currentFilter);
      });
    });
  }
});