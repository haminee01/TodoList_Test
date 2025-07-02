import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initialUsers } from "../../utils/data";
import { useAuth } from "../../context/AuthContext";
import { userAPI } from "../../utils/data";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser, login } = useAuth();

  useEffect(() => {
    console.log("!");
  }, []);

  useEffect(() => {
    if (currentUser) {
      navigate("/todo");
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setErrorMessage("모든 항목을 입력해주세요.");
      setLoading(false);
      return;
    }

    try {
      const result = await userAPI.login(email, password);
      if (result.success) {
        login({ email: result.user.email });
        navigate("/todo");
      }
    } catch (e) {
      setErrorMessage("잘못된 이메일 또는 비밀번호입니다.");
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleTestAccountClick = (email, password) => {
    setEmail(email);
    setPassword(password);
    setErrorMessage("");
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div
        className="card p-4 shadow-sm"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="card-title text-center mb-4">로그인</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              이메일 주소
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              disabled={loading}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              비밀번호
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <p id="errorMessage" className="text-danger text-center">
            {errorMessage}
          </p>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  로그인 중...
                </>
              ) : (
                "로그인"
              )}
            </button>
          </div>
        </form>

        <div className="mt-4 pt-3 border-top">
          <h6 className="text-muted text-center mb-3">테스트 계정</h6>
          <div className="small text-muted">
            <div className="mb-2">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm w-100 mb-1"
                onClick={() =>
                  handleTestAccountClick("user1@example.com", "password123")
                }
              >
                <strong>일반 사용자:</strong> user1@example.com / password123
              </button>
            </div>
            <div className="mb-2">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm w-100 mb-1"
                onClick={() =>
                  handleTestAccountClick("admin@example.com", "adminpass")
                }
              >
                <strong>관리자:</strong> admin@example.com / adminpass
              </button>
            </div>
            <div className="mb-2">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm w-100"
                onClick={() =>
                  handleTestAccountClick("guest@example.com", "guest")
                }
              >
                <strong>게스트:</strong> guest@example.com / guest
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
