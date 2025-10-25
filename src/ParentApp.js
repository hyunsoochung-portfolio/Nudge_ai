import React, { useState } from 'react';
import { LayoutDashboard, CreditCard, Phone, Settings, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function ParentApp() {
  const navigate = useNavigate(); 
    const [activeScreen, setActiveScreen] = useState('dashboard');
  const [showRuleDialog, setShowRuleDialog] = useState(false);
  const [ruleInput, setRuleInput] = useState('');
  const [aiMessages, setAiMessages] = useState([]);
  const [isLearning, setIsLearning] = useState(false);
  const [selectedCallLog, setSelectedCallLog] = useState(null);

  // 샘플 데이터
  const childData = {
    name: '지우',
    weeklyBudget: 50000,
    spent: 28500,
    remaining: 21500,
    savingGoal: 100000,
    saved: 45000
  };

  const [rules, setRules] = useState([
    { id: 1, rule: '밤 9시 이후 게임 결제 금지', active: true },
    { id: 2, rule: '3만원 이상 결제 시 저축목표 상기시키고 친절하게 설득하기', active: true },
    { id: 3, rule: '학원비는 금액 제한 없이 자동 승인', active: true },
    { id: 4, rule: '간식/편의점은 하루 5천원 이내로 교육하기', active: true },
    { id: 5, rule: '주간 예산 초과 시 다음주 용돈에서 차감 안내하기', active: true }
  ]);

  const pendingPayments = [
    { 
      id: 1, 
      merchant: '로블록스', 
      amount: 50000, 
      time: '방금 전',
      status: 'pending',
      aiDecision: 'reject',
      aiReason: '밤 9시 이후 게임 결제 규칙 위반, 저축 목표 달성에 방해'
    }
  ];

  const recentPayments = [
    { id: 1, merchant: '알라딘 중고서점 강남점', amount: 15000, time: '오늘 14:25', status: 'approved', category: '도서' },
    { id: 2, merchant: 'GS25 역삼점', amount: 3500, time: '오늘 16:18', status: 'approved', category: '편의점' },
    { id: 3, merchant: '스팀 게임', amount: 35000, time: '어제 22:15', status: 'rejected', category: '게임' },
    { id: 4, merchant: '서브웨이 강남역점', amount: 7500, time: '어제 12:30', status: 'approved', category: '식사' }
  ];

  const aiCallLogs = [
    {
      id: 1,
      type: 'payment',
      merchant: '로블록스',
      time: '오늘 21:30',
      duration: '1분 20초',
      result: 'AI 권장: 거부',
      summary: '게임머니 구매 시도. 밤 9시 이후 규칙 위반 및 저축 목표 영향으로 거부 권장.',
      conversation: [
        { sender: 'ai', text: '지우야, 안녕! 지금 로블록스 게임머니 50,000원 결제하려고 하는 거 맞아?', time: '21:30:00' },
        { sender: 'child', text: '네, 맞아요. 친구들이랑 같이 하려고요.', time: '21:30:05' },
        { sender: 'ai', text: '그렇구나! 그런데 지금 밤 9시 30분이야. 부모님이랑 밤 9시 이후엔 게임 결제 안 하기로 약속했던 거 기억나?', time: '21:30:10' },
        { sender: 'child', text: '아... 그랬던 것 같기도 해요.', time: '21:30:18' },
        { sender: 'ai', text: '그리고 지우는 지금 닌텐도 스위치 사려고 10만원 모으는 중이잖아. 지금 45,000원 모았는데, 여기서 50,000원 쓰면 목표가 멀어지지 않을까?', time: '21:30:22' },
        { sender: 'child', text: '아... 맞다. 스위치 사려면 아껴야 하는데...', time: '21:30:35' },
        { sender: 'ai', text: '내일 낮에 다시 생각해보는 건 어때? 정말 필요하면 내일 다시 결제하면 되잖아. 지금은 푹 쉬고, 스위치 목표도 지키고!', time: '21:30:40' },
        { sender: 'child', text: '알겠어요. 내일 다시 생각해볼게요. 고마워요!', time: '21:30:55' }
      ]
    },
    {
      id: 2,
      type: 'task',
      merchant: '수학 복습',
      time: '오늘 17:00',
      duration: '45초',
      result: '완료 확인',
      summary: '수학 복습 30분 완료 확인. 이해도 양호.',
      conversation: [
        { sender: 'ai', text: '지우야, 수학 복습 30분 다 했어?', time: '17:00:00' },
        { sender: 'child', text: '네! 방금 끝났어요.', time: '17:00:05' },
        { sender: 'ai', text: '오늘 뭐 공부했어?', time: '17:00:08' },
        { sender: 'child', text: '분수 나눗셈이요.', time: '17:00:12' },
        { sender: 'ai', text: '어려웠어?', time: '17:00:15' },
        { sender: 'child', text: '처음엔 어려웠는데 이제 알 것 같아요!', time: '17:00:20' },
        { sender: 'ai', text: '잘했어! 15포인트 받았어. 👍', time: '17:00:25' }
      ]
    },
    {
      id: 3,
      type: 'task',
      merchant: '학원 도착',
      time: '오늘 15:00',
      duration: '30초',
      result: '완료 확인',
      summary: '학원 도착 확인 완료.',
      conversation: [
        { sender: 'ai', text: '지우야, 학원 도착했어?', time: '15:00:00' },
        { sender: 'child', text: '네! 지금 막 도착했어요.', time: '15:00:03' },
        { sender: 'ai', text: '좋아! 오늘도 열심히 하자. 10포인트 받았어!', time: '15:00:08' }
      ]
    }
  ];

  const spendingByCategory = [
    { category: '도서', amount: 15000, percentage: 53 },
    { category: '식사', amount: 7500, percentage: 26 },
    { category: '편의점', amount: 3500, percentage: 12 },
    { category: '카페', amount: 2500, percentage: 9 }
  ];

  const handleApprove = (paymentId) => {
    alert('결제 승인됨');
  };

  const handleReject = (paymentId) => {
    alert('결제 거부됨');
  };

  const startRuleLearning = () => {
    if (!ruleInput.trim()) return;
    
    setIsLearning(true);
    setAiMessages([
      { sender: 'user', text: ruleInput },
      { sender: 'ai', text: '알겠습니다! 규칙을 정확히 이해하기 위해 몇 가지 확인할게요.' }
    ]);

    setTimeout(() => {
      setAiMessages(prev => [...prev, {
        sender: 'ai',
        text: '이 규칙은 어떤 카테고리에 적용하나요?',
        options: ['게임', '식사', '쇼핑', '교육', '전체']
      }]);
    }, 1000);
  };

  const handleAiOption = (option) => {
    setAiMessages(prev => [...prev, 
      { sender: 'user', text: option },
      { sender: 'ai', text: '시간대 제한이 있나요? (예: 밤 9시 이후)', type: 'input' }
    ]);
  };

  const handleAiInput = (value) => {
    setAiMessages(prev => [...prev,
      { sender: 'user', text: value },
      { sender: 'ai', text: '주말에도 동일하게 적용하나요?', options: ['예', '아니오'] }
    ]);
  };

  const finishRuleLearning = (answer) => {
    setAiMessages(prev => [...prev,
      { sender: 'user', text: answer },
      { sender: 'ai', text: '✅ 규칙이 성공적으로 추가되었습니다!', final: true }
    ]);

    setTimeout(() => {
      setRules(prev => [...prev, {
        id: prev.length + 1,
        rule: ruleInput,
        active: true
      }]);
      setShowRuleDialog(false);
      setRuleInput('');
      setAiMessages([]);
      setIsLearning(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-900 pb-24">
      {/* 헤더 */}
<header className="bg-stone-800 border-b border-stone-700 sticky top-0 z-10">
  <div className="max-w-6xl mx-auto px-6 py-4">
    <div className="flex items-center justify-between">
      <button 
        onClick={() => navigate('/select')}
        className="text-stone-400 hover:text-white text-sm"
      >
        ← 뒤로
      </button>
      <div className="text-center">
        <h1 className="text-xl font-bold text-white">부모 관리 대시보드</h1>
        <p className="text-xs text-stone-400">아이: {childData.name}</p>
      </div>
      <div className="bg-slate-600 p-2.5 rounded-xl">
        <LayoutDashboard className="w-5 h-5 text-white" />
      </div>
    </div>
  </div>
</header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-6xl mx-auto px-6 py-6">
        {/* 대시보드 */}
        {activeScreen === 'dashboard' && (
          <div className="space-y-6">
            {/* AI 통화 기록 */}
            <div className="bg-stone-800 border border-stone-700 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">AI 통화 기록</h2>
              <div className="space-y-4">
                {aiCallLogs.map(log => (
                  <button
                    key={log.id}
                    onClick={() => setSelectedCallLog(log)}
                    className="w-full bg-stone-900 hover:bg-stone-800 rounded-xl p-5 transition text-left"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-slate-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Phone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">
                            {log.type === 'payment' ? '🔴 결제 확인 전화' : '✅ 미션 확인 전화'}
                          </p>
                          <p className="text-sm text-stone-400">{log.merchant}</p>
                          <p className="text-xs text-stone-500 mt-1">{log.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-stone-400">{log.duration}</p>
                        <span className={`text-xs font-medium ${
                          log.result.includes('거부') ? 'text-gray-300' : 'text-gray-300'
                        }`}>
                          {log.result}
                        </span>
                      </div>
                    </div>
                    <div className="bg-stone-800 rounded-lg p-3">
                      <p className="text-sm text-stone-300">{log.summary}</p>
                    </div>
                    <div className="mt-3 text-right">
                      <span className="text-gray-300 text-sm">대화 내용 보기 →</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 긴급 알림 - 승인 대기 */}
            {pendingPayments.length > 0 && (
              <div className="bg-gray-800 border-2 border-gray-600 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-slate-600 rounded-xl flex items-center justify-center animate-pulse">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">결제 승인 요청</h2>
                      <p className="text-gray-300 text-sm">AI가 검토를 완료했습니다</p>
                    </div>
                  </div>
                  <span className="bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-bold animate-pulse">
                    {pendingPayments.length}건 대기
                  </span>
                </div>

                {pendingPayments.map(payment => (
                  <div key={payment.id} className="bg-stone-800 rounded-xl p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-white font-bold text-lg">{payment.merchant}</p>
                        <p className="text-stone-400 text-sm">{payment.time}</p>
                      </div>
                      <p className="text-2xl font-bold text-white">{payment.amount.toLocaleString()}원</p>
                    </div>

                    <div className="bg-stone-900 rounded-xl p-4 mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-gray-300 font-semibold text-sm">🤖 AI 권장: 거부</span>
                      </div>
                      <p className="text-stone-300 text-sm">{payment.aiReason}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleReject(payment.id)}
                        className="bg-stone-700 hover:bg-stone-600 text-white py-3 rounded-xl font-semibold transition"
                      >
                        거부
                      </button>
                      <button
                        onClick={() => handleApprove(payment.id)}
                        className="bg-slate-600 hover:bg-slate-700 text-white py-3 rounded-xl font-semibold transition"
                      >
                        승인
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* AI 결제 규칙 - 핵심 기능 강조 */}
            <div className="bg-gray-800 border-2 border-gray-600 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">🤖 AI 결제 규칙</h2>
                  <p className="text-gray-300 text-sm">AI가 자동으로 학습하고 판단합니다</p>
                </div>
                <div className="bg-slate-600 px-3 py-1 rounded-full">
                  <span className="text-white text-sm font-bold">핵심 기능</span>
                </div>
              </div>

              {/* 현재 규칙 목록 */}
              <div className="space-y-3 mb-4">
                {rules.map(rule => (
                  <div key={rule.id} className="bg-stone-800 bg-opacity-50 rounded-xl p-4 flex items-center justify-between hover:bg-opacity-70 transition">
                    <div className="flex items-center space-x-3 flex-1">
                      <input 
                        type="checkbox" 
                        checked={rule.active} 
                        onChange={() => {}}
                        className="w-5 h-5 flex-shrink-0" 
                      />
                      <span className="text-white text-sm">{rule.rule}</span>
                    </div>
                    <button className="text-stone-400 hover:text-gray-300 transition text-sm ml-3">삭제</button>
                  </div>
                ))}
              </div>

              {/* 규칙 추가 버튼 */}
              <button
                onClick={() => setShowRuleDialog(true)}
                className="w-full bg-slate-600 hover:bg-slate-700 text-white py-4 rounded-xl font-bold text-lg transition shadow-lg flex items-center justify-center space-x-2"
              >
                <span className="text-2xl">+</span>
                <span>AI에게 새 규칙 학습시키기</span>
              </button>
            </div>

            {/* 통화 기록 상세 모달 */}
            {selectedCallLog && (
              <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
                <div className="bg-stone-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <button
                      onClick={() => setSelectedCallLog(null)}
                      className="text-stone-400 hover:text-white mb-4 flex items-center"
                    >
                      ← 돌아가기
                    </button>
                    
                    <div className="mb-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-12 h-12 bg-slate-600 rounded-xl flex items-center justify-center">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-white">{selectedCallLog.merchant}</h2>
                          <p className="text-sm text-stone-400">{selectedCallLog.time} · {selectedCallLog.duration}</p>
                        </div>
                      </div>
                      <div className="bg-stone-900 rounded-lg p-3">
                        <span className={`text-sm font-medium ${
                          selectedCallLog.result.includes('거부') ? 'text-gray-300' : 'text-gray-300'
                        }`}>
                          {selectedCallLog.result}
                        </span>
                      </div>
                    </div>

                    {/* 대화 내용 */}
                    <div className="bg-stone-900 rounded-xl p-4 max-h-96 overflow-y-auto space-y-4">
                      {selectedCallLog.conversation.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}>
                          <div className={`max-w-xs ${msg.sender === 'ai' ? 'mr-auto' : 'ml-auto'}`}>
                            {msg.sender === 'ai' && (
                              <p className="text-stone-400 text-xs mb-1 ml-3">AI 도우미</p>
                            )}
                            {msg.sender === 'child' && (
                              <p className="text-stone-400 text-xs mb-1 mr-3 text-right">{childData.name}</p>
                            )}
                            <div className={`rounded-2xl px-4 py-3 ${
                              msg.sender === 'ai' 
                                ? 'bg-stone-700 text-white' 
                                : 'bg-slate-600 text-white'
                            }`}>
                              <p className="text-sm leading-relaxed">{msg.text}</p>
                              <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI 규칙 학습 다이얼로그 */}
            {showRuleDialog && (
              <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
                <div className="bg-stone-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b border-stone-700">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white">AI 규칙 학습</h3>
                      <button 
                        onClick={() => {
                          setShowRuleDialog(false);
                          setRuleInput('');
                          setAiMessages([]);
                          setIsLearning(false);
                        }}
                        className="text-stone-400 hover:text-white text-2xl"
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-stone-400 text-sm mt-2">자연어로 규칙을 입력하면 AI가 추가 질문을 통해 정확하게 학습합니다</p>
                  </div>

                  <div className="p-6 space-y-4">
                    {!isLearning ? (
                      <>
                        <div>
                          <label className="block text-white font-medium mb-2">규칙 입력</label>
                          <textarea
                            value={ruleInput}
                            onChange={(e) => setRuleInput(e.target.value)}
                            placeholder="예: 게임 결제는 부모에게 먼저 물어보기&#10;예: 3만원 이상은 왜 필요한지 설명하게 하기&#10;예: 학원 교재비는 자동 승인&#10;예: 친구 생일 선물은 2만원 이내로 교육하기"
                            className="w-full bg-stone-900 border border-stone-700 text-white rounded-xl px-4 py-3 h-32 resize-none"
                          />
                        </div>
                        <button
                          onClick={startRuleLearning}
                          disabled={!ruleInput.trim()}
                          className={`w-full py-4 rounded-xl font-bold text-lg transition ${
                            ruleInput.trim()
                              ? 'bg-slate-600 hover:bg-slate-700 text-white'
                              : 'bg-stone-700 text-stone-500 cursor-not-allowed'
                          }`}
                        >
                          AI 학습 시작
                        </button>
                      </>
                    ) : (
                      <div className="bg-stone-900 rounded-xl p-4 max-h-96 overflow-y-auto space-y-3">
                        {aiMessages.map((msg, index) => (
                          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs ${msg.sender === 'user' ? 'bg-slate-600' : 'bg-stone-700'} rounded-2xl px-4 py-3`}>
                              <p className="text-white text-sm">{msg.text}</p>
                              {msg.options && (
                                <div className="mt-3 space-y-2">
                                  {msg.options.map((option, i) => (
                                    <button
                                      key={i}
                                      onClick={() => {
                                        if (index === aiMessages.length - 1) {
                                          if (aiMessages.length > 4) {
                                            finishRuleLearning(option);
                                          } else {
                                            handleAiOption(option);
                                          }
                                        }
                                      }}
                                      className="w-full bg-stone-600 hover:bg-stone-500 text-white px-3 py-2 rounded-lg text-sm transition"
                                    >
                                      {option}
                                    </button>
                                  ))}
                                </div>
                              )}
                              {msg.type === 'input' && index === aiMessages.length - 1 && (
                                <div className="mt-3">
                                  <input
                                    type="text"
                                    placeholder="입력..."
                                    onKeyPress={(e) => {
                                      if (e.key === 'Enter' && e.target.value.trim()) {
                                        handleAiInput(e.target.value);
                                        e.target.value = '';
                                      }
                                    }}
                                    className="w-full bg-stone-600 text-white px-3 py-2 rounded-lg text-sm"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 요약 카드들 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 이번 주 지출 */}
              <div className="bg-stone-800 border border-stone-700 rounded-2xl p-6">
                <p className="text-stone-400 text-sm mb-2">이번 주 지출</p>
                <p className="text-3xl font-bold text-white mb-2">
                  {childData.spent.toLocaleString()}원
                </p>
                <p className="text-stone-500 text-sm">
                  승인 3건 · 거부 1건
                </p>
              </div>

              {/* 저축 */}
              <div className="bg-stone-800 border border-stone-700 rounded-2xl p-6">
                <p className="text-stone-400 text-sm mb-2">저축 목표</p>
                <p className="text-3xl font-bold text-white mb-2">
                  {Math.round((childData.saved / childData.savingGoal) * 100)}%
                </p>
                <div className="w-full bg-stone-700 rounded-full h-2">
                  <div 
                    className="bg-slate-600 h-2 rounded-full"
                    style={{ width: `${(childData.saved / childData.savingGoal) * 100}%` }}
                  />
                </div>
                <p className="text-stone-500 text-xs mt-2">
                  {childData.saved.toLocaleString()}원 / {childData.savingGoal.toLocaleString()}원
                </p>
              </div>
            </div>

            {/* 최근 결제 내역 */}
            <div className="bg-stone-800 border border-stone-700 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">최근 결제 내역</h3>
              <div className="space-y-3">
                {recentPayments.map(payment => (
                  <div key={payment.id} className="bg-stone-900 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-white">{payment.merchant}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-sm text-stone-400">{payment.time}</p>
                        <span className="text-stone-600">·</span>
                        <p className="text-xs text-stone-500">{payment.category}</p>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-bold text-white">{payment.amount.toLocaleString()}원</p>
                      {payment.status === 'approved' ? (
                        <span className="text-xs text-gray-300 flex items-center justify-end mt-1">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          승인됨
                        </span>
                      ) : (
                        <span className="text-xs text-gray-300 flex items-center justify-end mt-1">
                          <XCircle className="w-3 h-3 mr-1" />
                          거부됨
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 설정 화면 */}
        {activeScreen === 'settings' && (
          <div className="space-y-6">
            <div className="bg-stone-800 border border-stone-700 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">설정</h2>
              
              <div className="space-y-6">
                {/* 주간 용돈 */}
                <div>
                  <label className="block text-white font-medium mb-2">주간 용돈</label>
                  <input
                    type="number"
                    defaultValue={childData.weeklyBudget}
                    className="w-full bg-stone-900 border border-stone-700 text-white rounded-xl px-4 py-3"
                  />
                </div>

                {/* 저축 목표 */}
                <div>
                  <label className="block text-white font-medium mb-2">저축 목표</label>
                  <input
                    type="number"
                    defaultValue={childData.savingGoal}
                    className="w-full bg-stone-900 border border-stone-700 text-white rounded-xl px-4 py-3"
                  />
                </div>

                {/* 규칙 */}
                <div>
                  <label className="block text-white font-medium mb-3">결제 규칙</label>
                  <div className="space-y-3">
                    <div className="bg-stone-900 rounded-xl p-4 flex items-center justify-between">
                      <span className="text-stone-300">밤 9시 이후 게임 결제 금지</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </div>
                    <div className="bg-stone-900 rounded-xl p-4 flex items-center justify-between">
                      <span className="text-stone-300">1회 5만원 이상 결제 시 알림</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </div>
                    <div className="bg-stone-900 rounded-xl p-4 flex items-center justify-between">
                      <span className="text-stone-300">주간 예산 초과 시 차단</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <button className="w-full bg-slate-600 hover:bg-slate-700 text-white py-3 rounded-xl font-semibold transition">
                  저장
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 하단 네비게이션 - 대시보드만 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-stone-800 border-t border-stone-700 z-20">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex justify-center">
            <button
              onClick={() => setActiveScreen('dashboard')}
              className={`flex flex-col items-center py-3 rounded-xl transition px-6 ${
                activeScreen === 'dashboard'
                  ? 'text-gray-400'
                  : 'text-stone-400'
              }`}
            >
              <LayoutDashboard className="w-6 h-6 mb-1" />
              <span className="text-sm font-medium">대시보드</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}