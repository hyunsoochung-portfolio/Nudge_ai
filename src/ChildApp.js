import React, { useState, useEffect } from 'react';
import { Phone, DollarSign, Target, CheckCircle, Star, Award, Heart, PhoneOff, Mic, MicOff, Volume2, Clock, CreditCard, Camera, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
const ChildApp = () => {
  const navigate = useNavigate(); 
    const [activeScreen, setActiveScreen] = useState('home');
  const [callStatus, setCallStatus] = useState('none'); // 'none', 'incoming', 'incall'
  const [callTime, setCallTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState('none'); // 'none', 'selecting', 'qr', 'manual', 'waiting', 'approved', 'rejected'
  const [paymentAmount, setPaymentAmount] = useState('');
  const chatContainerRef = React.useRef(null);

  // 샘플 데이터
  const childData = {
    name: '지우',
    weeklyBudget: 50000,
    spent: 28500,
    remaining: 21500,
    savingGoal: 100000,
    saved: 45000,
    level: 5,
    points: 340
  };

  const todayTasks = [
    { id: 1, task: '오늘 학원 가기', completed: true, points: 10, time: '15:00', aiCalled: true, callResult: '학원 도착 확인 완료' },
    { id: 2, task: '수학 복습 30분', completed: true, points: 15, time: '17:00', aiCalled: true, callResult: '복습 완료, 이해도 확인함' },
    { id: 3, task: '영어 단어 20개 외우기', completed: false, points: 15, time: '19:00', aiCalled: false, callResult: '' },
    { id: 4, task: '내일 준비물 챙기기', completed: false, points: 10, time: '20:00', aiCalled: false, callResult: '' }
  ];

  const recentSpending = [
    { id: 1, merchant: '알라딘 중고서점 강남점', amount: 15000, time: '오후 2시 25분', category: '도서' },
    { id: 2, merchant: 'GS25 역삼점', amount: 3500, time: '오후 4시 18분', category: '편의점' },
    { id: 3, merchant: '서브웨이 강남역점', amount: 7500, time: '오후 12시 30분', category: '식사' },
    { id: 4, merchant: '스타벅스 테헤란로점', amount: 5500, time: '오전 10시 15분', category: '카페' }
  ];

  const achievements = [
    { id: 1, title: '용돈 절약왕', desc: '일주일 연속 목표 달성!', icon: '🏆', unlocked: true },
    { id: 2, title: '숙제 마스터', desc: '한 달 숙제 완료', icon: '📖', unlocked: true },
    { id: 3, title: '일찍 일어나기', desc: '7일 연속 7시 기상', icon: '⏰', unlocked: false },
    { id: 4, title: '저축왕', desc: '목표 금액 달성', icon: '💰', unlocked: false }
  ];

  // 통화 시간 타이머
  useEffect(() => {
    let interval;
    if (callStatus === 'incall') {
      interval = setInterval(() => {
        setCallTime(prev => prev + 1);
      }, 1000);
    } else {
      setCallTime(0);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  // 채팅 메시지 추가될 때마다 자동 스크롤
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatMessages]);

  // 통화 중 AI 메시지 시뮬레이션
  useEffect(() => {
    if (callStatus === 'incall') {
      // 통화 시작하면 메시지 초기화 및 시작
      setChatMessages([
        { sender: 'ai', text: '지우야, 안녕! 지금 로블록스 게임머니 50,000원 결제하려고 하는 거 맞아?', time: 0 }
      ]);

      // 1.5초 후
      const timer1 = setTimeout(() => {
        setChatMessages(prev => [...prev, 
          { sender: 'child', text: '네, 맞아요. 친구들이랑 같이 하려고요.', time: 1.5 }
        ]);
      }, 1500);

      // 3초 후
      const timer2 = setTimeout(() => {
        setChatMessages(prev => [...prev,
          { sender: 'ai', text: '그렇구나! 그런데 지금 밤 9시 30분이야. 부모님이랑 밤 9시 이후엔 게임 결제 안 하기로 약속했던 거 기억나?', time: 3 }
        ]);
      }, 3000);

      // 5초 후
      const timer3 = setTimeout(() => {
        setChatMessages(prev => [...prev,
          { sender: 'child', text: '아... 그랬던 것 같기도 해요.', time: 5 }
        ]);
      }, 5000);

      // 6.5초 후
      const timer4 = setTimeout(() => {
        setChatMessages(prev => [...prev,
          { sender: 'ai', text: '그리고 지우는 지금 닌텐도 스위치 사려고 10만원 모으는 중이잖아. 지금 45,000원 모았는데, 여기서 50,000원 쓰면 목표가 멀어지지 않을까?', time: 6.5 }
        ]);
      }, 6500);

      // 8.5초 후
      const timer5 = setTimeout(() => {
        setChatMessages(prev => [...prev,
          { sender: 'child', text: '아... 맞다. 스위치 사려면 아껴야 하는데...', time: 8.5 }
        ]);
      }, 8500);

      // 10초 후
      const timer6 = setTimeout(() => {
        setChatMessages(prev => [...prev,
          { sender: 'ai', text: '내일 낮에 다시 생각해보는 건 어때? 정말 필요하면 내일 다시 결제하면 되잖아. 지금은 푹 쉬고, 스위치 목표도 지키고!', time: 10 }
        ]);
      }, 10000);

      // 12초 후
      const timer7 = setTimeout(() => {
        setChatMessages(prev => [...prev,
          { sender: 'child', text: '알겠어요. 내일 다시 생각해볼게요. 고마워요!', time: 12 }
        ]);
      }, 12000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
        clearTimeout(timer5);
        clearTimeout(timer6);
        clearTimeout(timer7);
      };
    } else {
      setChatMessages([]);
    }
  }, [callStatus]);

  // 통화 시간 포맷팅
  const formatCallTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 전화 받기
  const answerCall = () => {
    setCallStatus('incall');
  };

  // 전화 끊기
  const endCall = () => {
    setCallStatus('none');
    setCallTime(0);
  };

  // 전화가 왔을 때 - 모던 스타일
  if (callStatus === 'incoming') {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        {/* 상단 여백 */}
        <div className="h-20"></div>
        
        {/* 중앙 컨텐츠 */}
        <div className="px-8 flex flex-col items-center">
          {/* AI 아이콘 */}
          <div className="w-24 h-24 bg-slate-600 rounded-3xl mb-6 flex items-center justify-center">
            <Phone className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">전화가 왔어요</h2>
          <p className="text-gray-500 mb-8">AI 도우미</p>

          {/* 전화 이유 */}
          <div className="w-full max-w-sm bg-gray-50 rounded-2xl p-5 mb-12 border border-gray-100">
            <p className="text-gray-500 text-sm mb-2">전화 이유</p>
            <p className="text-gray-900 font-medium">
              밤늦은 시간에 게임머니 결제를 하려고 하는데 괜찮은지 확인하고 싶어요
            </p>
          </div>

          {/* 버튼들 */}
          <div className="w-full max-w-sm space-y-3">
            <button 
              onClick={answerCall}
              className="w-full bg-slate-600 hover:bg-slate-700 text-white py-5 rounded-2xl font-semibold text-lg flex items-center justify-center space-x-2 transition"
            >
              <Phone className="w-5 h-5" />
              <span>전화 받기</span>
            </button>
            
            <button 
              onClick={endCall}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-5 rounded-2xl font-semibold transition"
            >
              나중에 받기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 통화 중일 때 - 모던 스타일
  if (callStatus === 'incall') {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        {/* 상단 헤더 */}
        <div className="bg-white border-b border-gray-100 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-600 rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">AI 도우미</h2>
              <p className="text-sm text-gray-500">{formatCallTime(callTime)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-slate-600 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-500">통화 중</span>
          </div>
        </div>

        {/* 채팅 메시지 영역 */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50"
        >
          {chatMessages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-xs ${msg.sender === 'ai' ? 'mr-auto' : 'ml-auto'}`}>
                {msg.sender === 'ai' && (
                  <p className="text-gray-400 text-xs mb-1 ml-3">AI</p>
                )}
                <div className={`rounded-2xl px-4 py-3 ${
                  msg.sender === 'ai' 
                    ? 'bg-white border border-gray-200 text-gray-900' 
                    : 'bg-slate-600 text-white'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            </div>
          ))}
          
          {/* 타이핑 인디케이터 */}
          {chatMessages.length > 0 && chatMessages.length % 2 === 1 && callTime > chatMessages[chatMessages.length - 1].time + 2 && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 하단 컨트롤 */}
        <div className="bg-white border-t border-gray-100 p-6">
          <div className="flex justify-center items-center space-x-4 mb-4">
            {/* 음소거 버튼 */}
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="flex flex-col items-center"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition ${
                isMuted ? 'bg-gray-200' : 'bg-gray-100'
              }`}>
                {isMuted ? <MicOff className="w-5 h-5 text-gray-600" /> : <Mic className="w-5 h-5 text-gray-600" />}
              </div>
              <span className="text-xs text-gray-500 mt-1">{isMuted ? '음소거' : '마이크'}</span>
            </button>

            {/* 스피커 버튼 */}
            <button className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-xs text-gray-500 mt-1">스피커</span>
            </button>
          </div>

          {/* 전화 끊기 버튼 */}
          <button 
            onClick={endCall}
            className="w-full bg-slate-600 hover:bg-slate-700 rounded-2xl py-4 flex items-center justify-center space-x-2 transition"
          >
            <PhoneOff className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">전화 끊기</span>
          </button>
        </div>
      </div>
    );
  }

  // 일반 앱 화면 (전화 없을 때)
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 헤더 - 모던 스타일 */}
<header className="bg-white border-b border-gray-100 sticky top-0 z-10">
  <div className="max-w-2xl mx-auto px-6 py-4">
    <div className="flex items-center justify-between">
      <button 
        onClick={() => navigate('/select')}
        className="text-gray-500 hover:text-gray-700 text-sm"
      >
        ← 뒤로
      </button>
      <div className="text-center">
        <h1 className="text-xl font-bold text-gray-900">{childData.name}의 AI 도우미</h1>
        <p className="text-xs text-gray-400">레벨 {childData.level} · {childData.points}P</p>
      </div>
      <div className="bg-slate-600 p-2.5 rounded-xl">
        <Phone className="w-5 h-5 text-white" />
      </div>
    </div>
  </div>
</header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-2xl mx-auto px-6 py-6">
        {/* 홈 화면 */}
        {activeScreen === 'home' && (
          <div className="space-y-6">
            {/* 인사 카드 - 모던 스타일 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">안녕, {childData.name}! </h2>
                  <p className="text-gray-500 mt-1">오늘도 좋은 하루 보내자</p>
                </div>
                <div className="text-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">레벨</p>
                  <p className="text-2xl font-bold text-gray-900">{childData.level}</p>
                </div>
              </div>
            </div>

            {/* 이번 주 용돈 - 모던 스타일 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">이번 주 용돈</h3>
                <span className="text-2xl">💰</span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-4xl font-bold text-gray-900">
                    {childData.remaining.toLocaleString()}
                  </span>
                  <span className="text-gray-400 text-sm mb-2">
                    / {childData.weeklyBudget.toLocaleString()}원
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-slate-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(childData.remaining / childData.weeklyBudget) * 100}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-gray-500 text-xs mb-1">사용함</p>
                  <p className="text-gray-900 font-bold text-lg">{childData.spent.toLocaleString()}원</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-gray-600 text-xs mb-1">남음</p>
                  <p className="text-gray-900 font-bold text-lg">{childData.remaining.toLocaleString()}원</p>
                </div>
              </div>
            </div>

            {/* 결제하기 버튼 - 모던 스타일 */}
            <button
              onClick={() => {
                setActiveScreen('payment');
              }}
              className="w-full bg-slate-600 hover:bg-slate-700 text-white py-5 rounded-2xl font-semibold text-lg transition flex items-center justify-center space-x-3"
            >
              <CreditCard className="w-6 h-6" />
              <span>결제하기</span>
            </button>

            {/* 오늘의 미션 - 모던 스타일 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">오늘의 미션</h3>
                <span className="bg-gray-50 text-gray-800 px-3 py-1 rounded-lg text-sm font-semibold border border-gray-100">
                  {todayTasks.filter(t => t.completed).length}/{todayTasks.length}
                </span>
              </div>

              <div className="space-y-3">
                {todayTasks.map(task => (
                  <div 
                    key={task.id}
                    className={`p-4 rounded-xl border transition ${
                      task.completed 
                        ? 'bg-gray-50 border-gray-200' 
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          task.completed ? 'bg-slate-600' : 'bg-gray-200'
                        }`}>
                          {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                        <div className="flex-1">
                          <span className={`font-medium text-sm block ${
                            task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                          }`}>
                            {task.task}
                          </span>
                          <span className="text-xs text-gray-400">{task.time}</span>
                        </div>
                      </div>
                      <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg text-xs font-semibold ml-2">
                        +{task.points}P
                      </span>
                    </div>
                    
                    {/* AI 전화 확인 표시 */}
                    {task.aiCalled && (
                      <div className="flex items-center space-x-2 ml-10 mt-2">
                        <Phone className="w-3 h-3 text-gray-600" />
                        <span className="text-xs text-gray-500">{task.callResult}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setActiveScreen('goals')}
                className="w-full mt-4 bg-gray-50 hover:bg-gray-100 text-gray-700 py-3 rounded-xl font-medium text-sm transition border border-gray-100"
              >
                전체 미션 보기
              </button>
            </div>

            {/* 저축 목표 - 모던 스타일 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">저축 목표</h3>
              <div className="mb-3">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">현재 저축액</span>
                  <span className="text-xl font-bold text-gray-900">{childData.saved.toLocaleString()}원</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-slate-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(childData.saved / childData.savingGoal) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  목표: {childData.savingGoal.toLocaleString()}원
                </p>
              </div>
              <p className="text-sm text-gray-600">
                {Math.round((childData.saved / childData.savingGoal) * 100)}% 달성했어요! 💪
              </p>
            </div>
          </div>
        )}

        {/* 용돈 내역 화면 */}
        {activeScreen === 'money' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">💰 용돈 내역</h2>
              
              {/* 요약 카드 */}
              <div className="bg-gray-900 rounded-2xl p-6 text-white mb-6">
                <p className="text-gray-300 text-sm mb-2">이번 주 사용 금액</p>
                <p className="text-4xl font-bold mb-4">{childData.spent.toLocaleString()}원</p>
                <div className="flex items-center justify-between text-sm">
                  <span>남은 금액: {childData.remaining.toLocaleString()}원</span>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    {Math.round((childData.remaining / childData.weeklyBudget) * 100)}% 남음
                  </span>
                </div>
              </div>

              {/* 사용 내역 */}
              <h3 className="font-bold text-gray-800 mb-4">최근 사용 내역</h3>
              <div className="space-y-3">
                {recentSpending.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.merchant}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-sm text-gray-500">{item.time}</p>
                        <span className="text-gray-300">·</span>
                        <p className="text-xs text-gray-400">{item.category}</p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900 ml-4">-{item.amount.toLocaleString()}원</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 용돈 팁 */}
            <div className="bg-gray-900 rounded-3xl p-6 text-white shadow-lg">
              <h3 className="text-xl font-bold mb-2 flex items-center">
                💡 용돈 관리 팁
              </h3>
              <p className="text-gray-300">
                이번 주 목표를 달성하면 보너스 포인트를 받을 수 있어요!
              </p>
            </div>
          </div>
        )}

        {/* 결제 화면 */}
        {activeScreen === 'payment' && (
          <div className="space-y-6">
            {/* 결제 방법 선택 - 모던 스타일 */}
            {paymentStatus === 'none' && (
              <>
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">결제 방법 선택</h2>
                  <p className="text-gray-500 text-sm mb-6">어떤 방법으로 결제할까요?</p>
                  
                  <div className="space-y-3">
                    {/* QR 결제 */}
                    <button
                      onClick={() => setPaymentStatus('qr')}
                      className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-800 p-5 rounded-2xl transition"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-gray-100 p-3 rounded-xl">
                          <QrCode className="w-6 h-6 text-gray-700" />
                        </div>
                        <div className="text-left flex-1">
                          <p className="font-semibold text-gray-900">QR 코드 결제</p>
                          <p className="text-gray-500 text-sm">오프라인 매장에서 사용</p>
                        </div>
                      </div>
                    </button>

                    {/* 간편결제 */}
                    <button
                      onClick={() => setCallStatus('incoming')}
                      className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-800 p-5 rounded-2xl transition"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-gray-100 p-3 rounded-xl">
                          <CreditCard className="w-6 h-6 text-gray-700" />
                        </div>
                        <div className="text-left flex-1">
                          <p className="font-semibold text-gray-900">간편결제</p>
                          <p className="text-gray-500 text-sm">온라인 쇼핑몰, 앱 결제</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* 남은 용돈 표시 */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">사용 가능 금액</p>
                      <p className="text-3xl font-bold text-gray-900">{childData.remaining.toLocaleString()}원</p>
                    </div>
                    <DollarSign className="w-10 h-10 text-gray-600" />
                  </div>
                </div>
              </>
            )}

            {/* QR 결제 화면 - 모던 스타일 */}
            {paymentStatus === 'qr' && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <button
                  onClick={() => setPaymentStatus('none')}
                  className="text-gray-500 hover:text-gray-700 mb-4 flex items-center"
                >
                  ← 돌아가기
                </button>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">QR 코드 스캔</h2>
                
                {/* QR 스캐너 화면 시뮬레이션 */}
                <div className="bg-gray-900 rounded-2xl p-8 mb-6 relative overflow-hidden" style={{ height: '400px' }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 border-4 border-white border-dashed rounded-2xl flex items-center justify-center">
                      <Camera className="w-16 h-16 text-white opacity-50" />
                    </div>
                  </div>
                  <p className="absolute bottom-8 left-0 right-0 text-center text-white text-sm">
                    매장의 QR 코드를 스캔해주세요
                  </p>
                </div>

                <button
                  onClick={() => {
                    setCallStatus('incoming');
                  }}
                  className="w-full bg-slate-600 hover:bg-slate-700 text-white py-4 rounded-2xl font-semibold transition"
                >
                  스캔 완료 (테스트)
                </button>
              </div>
            )}

            {/* 간편결제 화면 - 온라인 결제 감지 - 모던 스타일 */}
            {paymentStatus === 'manual' && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <button
                    onClick={() => setPaymentStatus('none')}
                    className="text-gray-500 hover:text-gray-700 mb-4 flex items-center"
                  >
                    ← 돌아가기
                  </button>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">온라인 간편결제</h2>
                  <p className="text-gray-500 text-sm mb-6">
                    쇼핑몰에서 결제하면 자동으로 AI가 확인해요
                  </p>

                  {/* 결제 대기 중인 항목 */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3 text-sm">결제 승인 대기 중</h3>
                    <div className="space-y-3">
                      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-100">
                              <span className="text-2xl">🎮</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">로블록스 게임머니</p>
                              <p className="text-sm text-gray-500">방금 전</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-gray-900">50,000원</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg font-medium border border-gray-200">
                            AI 확인 중
                          </span>
                          <button
                            onClick={() => {
                              setCallStatus('incoming');
                            }}
                            className="flex items-center space-x-1.5 bg-slate-600 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>AI 전화 받기</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 최근 승인/거부 내역 */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 text-sm">최근 내역</h3>
                    <div className="space-y-2">
                      <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">📚</span>
                          <div>
                            <p className="text-sm font-medium text-gray-900">알라딘 중고서점</p>
                            <p className="text-xs text-gray-400">오늘 14:25</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">15,000원</p>
                          <span className="text-xs text-gray-700 font-medium">✓ 승인됨</span>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">🎮</span>
                          <div>
                            <p className="text-sm font-medium text-gray-900">스팀 게임</p>
                            <p className="text-xs text-gray-400">어제 22:15</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">35,000원</p>
                          <span className="text-xs text-gray-700 font-medium">✗ 거부됨</span>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">🍔</span>
                          <div>
                            <p className="text-sm font-medium text-gray-900">배달의민족</p>
                            <p className="text-xs text-gray-400">어제 18:30</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">12,000원</p>
                          <span className="text-xs text-gray-700 font-medium">✓ 승인됨</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 안내 카드 */}
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-600" />
                    어떻게 작동하나요?
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    쿠팡, 로블록스 등에서 결제하면 AI가 자동으로 감지하고 전화해서 확인해요. 승인되면 바로 결제가 완료돼요!
                  </p>
                </div>
              </div>
            )}

            {/* 결제 승인 대기 - 모던 스타일 */}
            {paymentStatus === 'waiting' && (
              <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-2xl mx-auto mb-4 flex items-center justify-center border border-gray-100">
                  <Phone className="w-10 h-10 text-gray-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">AI 확인 중</h2>
                <p className="text-gray-500 mb-4">
                  곧 전화가 올 거예요<br />
                  잠시만 기다려주세요
                </p>
                <div className="flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 나의 목표 화면 */}
        {activeScreen === 'goals' && (
          <div className="space-y-6">
            {/* 레벨 & 포인트 */}
            <div className="bg-gray-900 rounded-3xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-300 text-sm mb-1">현재 레벨</p>
                  <p className="text-4xl font-bold">Level {childData.level}</p>
                </div>
                <div className="text-center bg-white bg-opacity-20 rounded-2xl p-4">
                  <Star className="w-8 h-8 mx-auto mb-1" />
                  <p className="text-xl font-bold">{childData.points}P</p>
                </div>
              </div>
              <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '68%' }} />
              </div>
              <p className="text-gray-300 text-sm mt-2">다음 레벨까지 160P 남음!</p>
            </div>

            {/* 오늘의 할 일 */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">✅ 오늘의 할 일</h2>
              <div className="space-y-3">
                {todayTasks.map(task => (
                  <div 
                    key={task.id}
                    className={`p-4 rounded-2xl transition ${
                      task.completed 
                        ? 'bg-gray-100 border-2 border-gray-300' 
                        : 'bg-gray-50 border-2 border-dashed border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3 flex-1">
                        <button className={`w-10 h-10 rounded-full flex items-center justify-center transition flex-shrink-0 ${
                          task.completed ? 'bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'
                        }`}>
                          {task.completed && <CheckCircle className="w-6 h-6 text-white" />}
                        </button>
                        <div className="flex-1">
                          <span className={`font-medium block ${
                            task.completed ? 'text-gray-600 line-through' : 'text-gray-900'
                          }`}>
                            {task.task}
                          </span>
                          <span className="text-xs text-gray-500">{task.time} 예정</span>
                        </div>
                      </div>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-bold ml-2">
                        +{task.points}P
                      </span>
                    </div>
                    
                    {/* AI 전화 확인 표시 */}
                    {task.aiCalled && (
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 ml-13 mt-2">
                        <div className="flex items-start space-x-2">
                          <Phone className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-700 font-medium">AI가 전화로 확인함</p>
                            <p className="text-xs text-gray-600 mt-0.5">{task.callResult}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {!task.aiCalled && !task.completed && (
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 ml-13 mt-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <p className="text-xs text-gray-500">AI가 곧 전화로 확인할 예정이에요</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 획득한 뱃지 */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">🏆 나의 뱃지</h2>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map(achievement => (
                  <div 
                    key={achievement.id}
                    className={`p-4 rounded-2xl text-center transition ${
                      achievement.unlocked 
                        ? 'bg-gray-800 text-white' 
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <p className="font-bold text-sm mb-1">{achievement.title}</p>
                    <p className="text-xs opacity-80">{achievement.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 하단 네비게이션 - 모던 스타일 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-20">
        <div className="max-w-2xl mx-auto px-6 py-3">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setActiveScreen('home')}
              className={`flex flex-col items-center py-3 rounded-xl transition ${
                activeScreen === 'home'
                  ? 'text-black'
                  : 'text-gray-400'
              }`}
            >
              <Heart className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">홈</span>
            </button>
            <button
              onClick={() => setActiveScreen('money')}
              className={`flex flex-col items-center py-3 rounded-xl transition ${
                activeScreen === 'money'
                  ? 'text-black'
                  : 'text-gray-400'
              }`}
            >
              <DollarSign className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">용돈</span>
            </button>
            <button
              onClick={() => setActiveScreen('goals')}
              className={`flex flex-col items-center py-3 rounded-xl transition ${
                activeScreen === 'goals'
                  ? 'text-black'
                  : 'text-gray-400'
              }`}
            >
              <Target className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">목표</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ChildApp;