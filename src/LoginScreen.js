import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // 로그인 폼 상태
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  
  // 회원가입 폼 상태
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'parent' // 'parent' or 'child'
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // 간단한 검증
    if (!loginForm.email || !loginForm.password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    
    // 로그인 처리 (실제로는 API 호출)
    // 여기서는 localStorage에 저장
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', loginForm.email);
    
    // 선택 화면으로 이동
    navigate('/select');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // 간단한 검증
    if (!signupForm.name || !signupForm.email || !signupForm.password) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    
    if (signupForm.password !== signupForm.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    if (signupForm.password.length < 6) {
      alert('비밀번호는 6자 이상이어야 합니다.');
      return;
    }
    
    // 회원가입 처리 (실제로는 API 호출)
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', signupForm.email);
    localStorage.setItem('userName', signupForm.name);
    localStorage.setItem('userRole', signupForm.role);
    
    // 선택 화면으로 이동
    navigate('/select');
  };

  const handleDemoMode = () => {
    // 데모 모드 (로그인 없이)
    localStorage.removeItem('isLoggedIn');
    navigate('/select');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">넛지</h1>
          <p className="text-gray-600">부모 대신 전화 걸어 경제관념과 생활습관을 교육하는 똑똑한 AI</p>
        </div>

        {/* 탭 버튼 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-xl font-semibold transition ${
                isLogin
                  ? 'bg-slate-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <LogIn className="w-4 h-4" />
                <span>로그인</span>
              </div>
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-xl font-semibold transition ${
                !isLogin
                  ? 'bg-slate-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <UserPlus className="w-4 h-4" />
                <span>회원가입</span>
              </div>
            </button>
          </div>

          {/* 로그인 폼 */}
          {isLogin && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="example@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  비밀번호
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent pr-12"
                    placeholder="비밀번호를 입력하세요"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-slate-600 hover:bg-slate-700 text-white py-4 rounded-xl font-semibold text-lg transition"
              >
                로그인
              </button>
            </form>
          )}

          {/* 회원가입 폼 */}
          {!isLogin && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  이름
                </label>
                <input
                  type="text"
                  value={signupForm.name}
                  onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="이름을 입력하세요"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="example@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  비밀번호
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent pr-12"
                    placeholder="6자 이상"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  비밀번호 확인
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={signupForm.confirmPassword}
                  onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="비밀번호를 다시 입력하세요"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  역할 선택
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSignupForm({ ...signupForm, role: 'parent' })}
                    className={`py-3 rounded-xl font-medium transition ${
                      signupForm.role === 'parent'
                        ? 'bg-slate-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    부모
                  </button>
                  <button
                    type="button"
                    onClick={() => setSignupForm({ ...signupForm, role: 'child' })}
                    className={`py-3 rounded-xl font-medium transition ${
                      signupForm.role === 'child'
                        ? 'bg-slate-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    아이
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-slate-600 hover:bg-slate-700 text-white py-4 rounded-xl font-semibold text-lg transition"
              >
                회원가입
              </button>
            </form>
          )}
        </div>

        {/* 데모 버튼 */}
        <button
          onClick={handleDemoMode}
          className="w-full bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-gray-400 text-gray-700 py-4 rounded-xl font-semibold text-lg transition shadow-lg"
        >
          데모버전 서비스 체험하기
        </button>

        {/* 안내 문구 */}
        <p className="text-center text-gray-500 text-sm mt-4">
          데모 버전에서는 로그인 없이 모든 기능을 체험할 수 있습니다
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;

