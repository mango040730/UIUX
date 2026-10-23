const root = document.querySelector('.blank-content');

if (root) {
  const match = window.location.pathname.match(/book-(\d+)\.html$/);
  const bookNumber = match ? Number(match[1]) : 1;
  const bookIndex = String(bookNumber).padStart(2, '0');
  const rawTitle = document.title.split(' — ')[0];
  const escapeHTML = (value) => value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[character]);
  const title = escapeHTML(rawTitle);
  const colors = [
    '#ef8ebc', '#1e6848', '#ef5221', '#37383a', '#ef93bd', '#b97990',
    '#213a50', '#e84149', '#285a93', '#d9d9d6', '#2c315b', '#eba824',
    '#48140e', '#f36322', '#2b873f', '#d6d5d1', '#a9cee8', '#303030'
  ];
  const accent = colors[(bookNumber - 1) % colors.length];

  const defaultSpreads = [
    [
      {
        label: 'Cover',
        html: `<div class="cover-page cover-page--archive"><span class="pill">Process archive ${bookIndex}</span><h1>${title}</h1><div class="cover-meta"><span>Research · Decisions<br>Changes · Reflections</span><span>Vol. ${bookIndex}<br>2026</span></div></div>`
      },
      {
        label: 'Archive protocol',
        html: `<div class="archive-document"><p class="document-code">00 / 기록 방식</p><h2>과정 아카이빙<br>방법 정하기</h2><div class="document-body"><p>조사, 관찰, 회의, 스케치처럼 우리가 거친 과정은 결과물을 쉽게 만드는 시대에 고민을 보여 주는 가장 좋은 증거입니다.</p><ul class="rule-list"><li>팀이 이 과정을 어떻게 남길지 정하고, 이번 주 작업부터 같은 방식으로 기록합니다.</li><li>아카이빙은 발표자료를 대신하지 않습니다. 얼마나 많이 했는지가 아니라 <mark>그래서 무엇을 판단했는지</mark>를 보여 줍니다.</li><li>기록마다 한 줄을 붙입니다. <mark>무엇을 알게 됐고, 무엇을 바꿨는가.</mark></li><li>AI를 썼다면 제안 중 따르지 않은 것과 그 이유도 함께 남깁니다.</li></ul></div><p class="document-note">이 책의 모든 페이지는 위 네 가지 원칙을 따릅니다.</p></div>`
      }
    ],
    [
      {
        label: 'Recording system',
        html: `<div class="archive-document"><p class="document-code">01 / 기록 원칙</p><h2>결과보다<br>판단의 흔적</h2><div class="document-body columns"><section><h3>무엇을 기록할까</h3><p>완성된 이미지뿐 아니라 질문, 실패한 시도, 회의 중 바뀐 의견, 관찰에서 발견한 작은 징후를 함께 남깁니다.</p></section><section><h3>어떻게 연결할까</h3><p>모든 기록에 날짜와 작성자, 관련 파일, 다음 행동을 붙입니다. 기록이 다음 판단으로 이어지는 흐름이 보여야 합니다.</p></section><section><h3>한 줄 요약</h3><p class="key-sentence">이 기록 이후 우리는 무엇을 알게 됐고, 무엇을 바꿨는가?</p></section></div></div>`
      },
      {
        label: 'Observation log',
        html: `<div class="archive-document"><p class="document-code">02 / 관찰 기록 · 2026.10.20</p><h2>관찰에서 발견한<br>사용자의 망설임</h2><dl class="meta-list"><div><dt>상황</dt><dd>첫 화면에서 책을 고르는 과정 관찰</dd></div><div><dt>방법</dt><dd>비개입 관찰 20분 · 참여자 4명</dd></div><div><dt>자료</dt><dd>OBS-01 영상, 메모 12개, 화면 캡처 8장</dd></div></dl><div class="document-body"><h3>관찰 내용</h3><p>참여자들은 책 제목보다 색과 높이를 먼저 훑었습니다. 클릭 가능한 영역을 확인하기 위해 커서를 여러 번 움직였고, 표지가 열리는 순간에야 상세 페이지를 예상했습니다.</p><h3>해석</h3><p>정보가 부족해서가 아니라 상호작용의 결과를 미리 알 수 없어서 망설였습니다.</p><p class="change-line"><span>알게 된 점</span> 선택 전에도 책의 성격을 짐작할 단서가 필요하다.</p><p class="change-line"><span>바꾼 점</span> 호버 시 표지와 제목이 함께 드러나도록 전환했다.</p></div></div>`
      }
    ],
    [
      {
        label: 'Meeting record',
        html: `<div class="archive-document"><p class="document-code">03 / 회의 기록 · 2026.10.21</p><h2>무엇을 남기고<br>무엇을 덜어낼까</h2><div class="conversation"><p><span>10:05 · A</span> 모든 과정을 시간순으로 보여 주면 양은 많지만 핵심 판단이 흐려질 수 있다.</p><p><span>10:18 · B</span> 실패한 안도 남기되, 왜 멈췄는지 한 문장을 붙이자.</p><p><span>10:31 · C</span> 이미지보다 텍스트가 많은 프로젝트이므로 기록 단위를 짧게 나누자.</p></div><div class="decision-summary"><span>결론 01</span><p>시간순 기록 위에 ‘판단’과 ‘변경’ 태그를 추가한다. 같은 태그를 전 페이지에서 반복해 읽는 방식을 학습시키기로 했다.</p></div></div>`
      },
      {
        label: 'Decision record',
        html: `<div class="archive-document"><p class="document-code">04 / 판단 기록 · DEC-02</p><h2>두 페이지 구성을<br>유지하기로 했다</h2><div class="option-list"><div><span>A / 한 페이지</span><p>집중해서 읽기 쉽지만 기록 사이의 비교가 어렵다.</p><b>보류</b></div><div class="selected"><span>B / 두 페이지</span><p>근거와 판단, 이전과 이후를 나란히 놓을 수 있다.</p><b>선택</b></div><div><span>C / 무한 스크롤</span><p>내용 추가는 쉽지만 책을 넘기는 감각이 사라진다.</p><b>제외</b></div></div><p class="change-line"><span>판단 기준</span> 텍스트의 양보다 기록 사이의 관계가 잘 보이는가.</p></div>`
      }
    ],
    [
      {
        label: 'Change log',
        html: `<div class="archive-document"><p class="document-code">05 / 작업 변화 · VER. 03</p><h2>기록 구조의<br>전과 후</h2><div class="before-after"><section><span>Before</span><h3>한 일의 목록</h3><p>조사 3회, 인터뷰 4명, 시안 6개를 제작했다.</p><p class="muted">양은 보이지만 왜 다음 단계로 이동했는지 알기 어렵다.</p></section><section><span>After</span><h3>판단의 연결</h3><p>관찰에서 망설임을 발견했고, 선택 전 단서가 필요하다고 판단해 호버 표지를 추가했다.</p><p class="muted">근거 → 판단 → 변경의 흐름이 드러난다.</p></section></div><p class="change-line"><span>변경 이유</span> 발표를 위한 요약이 아니라 다음 사람이 과정을 추적할 수 있는 기록이 필요했다.</p></div>`
      },
      {
        label: 'AI use record',
        html: `<div class="archive-document"><p class="document-code">06 / AI 사용 기록 · AI-04</p><h2>따르지 않은 제안도<br>과정으로 남긴다</h2><div class="ai-record"><section><span class="pill">Prompt</span><p>글이 많은 아카이빙 북의 정보 구조와 페이지 유형을 제안해 달라고 요청했다.</p></section><section><span class="pill">Accepted</span><p>관찰, 회의, 판단, 변화 기록을 동일한 메타데이터 구조로 반복하는 제안.</p></section><section class="rejected"><span class="pill">Rejected</span><p>모든 기록을 카드형 대시보드로 바꾸는 제안. 빠르게 훑기에는 좋지만 긴 글의 맥락이 분절되어 채택하지 않았다.</p></section></div><p class="change-line"><span>우리의 판단</span> AI의 정리 속도는 활용하되, 읽기의 호흡과 최종 편집 기준은 팀이 결정한다.</p></div>`
      }
    ],
    [
      {
        label: 'Weekly reflection',
        html: `<div class="archive-document"><p class="document-code">07 / 주간 회고 · WEEK 04</p><h2>이번 주에<br>달라진 것</h2><div class="reflection-list"><section><span>Learned</span><p>과정을 많이 남기는 것보다 판단이 바뀐 순간을 정확히 남기는 것이 중요했다.</p></section><section><span>Changed</span><p>이미지 중심 페이지를 줄이고, 한 페이지 안에서 근거와 결론이 연결되도록 글의 구조를 바꿨다.</p></section><section><span>Next</span><p>각 기록에 연결된 원본 파일과 다음 행동을 표시하고 실제 프로젝트 자료로 교체한다.</p></section></div><p class="document-note">다음 기록 예정일 · 2026.10.28 / 담당 · TEAM IZA</p></div>`
      },
      {
        label: 'Evidence index',
        html: `<div class="archive-document"><p class="document-code">08 / 증거 인덱스</p><h2>과정을 증명하는<br>자료 목록</h2><ol class="evidence-list"><li><span>OBS-01</span><strong>사용자 관찰 영상</strong><em>20:14</em></li><li><span>NOTE-12</span><strong>현장 메모와 발화 기록</strong><em>12 items</em></li><li><span>MTG-03</span><strong>회의 기록 및 결정 사항</strong><em>38:02</em></li><li><span>SK-06</span><strong>초기 구조 스케치</strong><em>6 sheets</em></li><li><span>AI-04</span><strong>AI 제안과 거절 이유</strong><em>4 logs</em></li><li><span>VER-03</span><strong>변경 전후 화면</strong><em>2 states</em></li></ol><p class="change-line"><span>읽는 방법</span> 각 코드가 본문의 판단 기록과 원본 자료를 연결한다.</p></div>`
      }
    ],
    [
      {
        label: 'Long-form note',
        html: `<div class="archive-document prose-page"><p class="document-code">09 / 본문 원고</p><h2>기록은 결과의<br>부록이 아니다</h2><div class="long-copy"><p>아카이빙은 이미 끝난 일을 정리하는 단계로 오해되기 쉽다. 그러나 과정 기록은 다음 판단을 만드는 작업에 더 가깝다. 관찰에서 발견한 장면이 회의의 질문이 되고, 회의에서 정리된 질문이 시안의 기준이 되는 연결을 남기면 결과물만으로는 보이지 않던 고민의 구조가 드러난다.</p><p>그래서 좋은 기록은 ‘무엇을 했다’에서 멈추지 않는다. 그 일을 통해 무엇을 알게 되었는지, 이전의 가정 중 무엇이 틀렸는지, 그 결과 어떤 결정을 바꾸었는지를 함께 말한다. 실패한 시안과 채택하지 않은 제안도 같은 이유로 중요하다.</p><p>AI를 활용한 과정 역시 완성된 출력보다 선택의 기준을 기록해야 한다. 어떤 제안을 받아들였고 어떤 제안을 거절했는지, 그 이유가 프로젝트의 목표와 어떻게 연결되는지를 남길 때 AI 사용은 사고를 대신한 흔적이 아니라 사고를 검토한 증거가 된다.</p></div></div>`
      },
      {
        label: 'Index & colophon',
        html: `<div class="closing-page"><div><p class="document-code">10 / Index</p><h2>${title}</h2><ul class="closing-index"><li><span>01</span><span>Archive protocol</span><span>02</span></li><li><span>02</span><span>Observation &amp; meeting</span><span>04</span></li><li><span>03</span><span>Decision &amp; change</span><span>06</span></li><li><span>04</span><span>AI use &amp; reflection</span><span>08</span></li><li><span>05</span><span>Evidence &amp; long-form</span><span>10</span></li></ul></div><div class="cover-meta"><span>Process archive<br>Template ${bookIndex}</span><span>IZA<br>2026</span></div></div>`
      }
    ]
  ];
  const bookOneSpreads = [
    [
      {
        label: 'Cover',
        html: `<div class="cover-page cover-page--archive"><span class="pill">UX Design Project · 2026</span><h1>현재 사회를 관통할 수 있는 주제 의식은 무엇일까?</h1><div class="cover-meta"><span>산업디자인학과<br>팀 강김원</span><span>강우경 · 김려경 · 원채영<br>2026.10.15</span></div></div>`
      },
      {
        label: 'Topic selection',
        html: `<div class="archive-document"><p class="document-code">01 / 주제 선정</p><h2>세 가지 사회 변화에서<br>질문을 찾다</h2><div class="topic-stack"><section><span>S · T · P</span><h3>혼자 사는데 혼자 있지 못하는 집</h3><p>1인 가구의 외로움과 사회적 고립이 부각되는 한편, 스마트홈·AI·웨어러블은 사용자의 생활 패턴과 주변 소리까지 감지한다. 가장 사적인 공간에서 기술의 관찰과 개입을 어디까지 허용할 것인가.</p></section><section><span>S · T · E</span><h3>돌봄받는 노년</h3><p>2024년 고령자 1인 가구는 228만 9천 가구로 전체 일반가구의 10.3%다. 집 자체가 위험 상황을 감지하고 외부 지원과 연결하는 돌봄 공간으로 변하고 있다.</p></section><section><span>S · T · E</span><h3>사라지는 대면 서비스</h3><p>무인 서비스와 AI 상담은 일상 인프라가 되었지만 모든 사람이 같은 속도로 적응하지 않는다. 70대 이상의 키오스크 이용 경험은 36.1%에 그쳤다.</p></section></div></div>`
      }
    ],
    [
      {
        label: 'Problem definition',
        html: `<div class="archive-document problem-page"><p class="document-code">02 / 문제 정의</p><h2>관계가 있음에도<br>소속감을 느끼지 못한다면?</h2><p class="lead-copy">비대면 서비스와 1인 가구의 증가로 외로움은 사회적 문제로 자리 잡았다. 그러나 기존 정책은 고립과 고독에 집중하고, <mark>사회적 연결 속에서 느끼는 외로움</mark>은 충분히 다루지 않는다.</p><div class="number-grid"><section><strong>804.5만</strong><span>2024년 한국의 1인 가구</span></section><section><strong>36.1%</strong><span>전체 가구 중 1인 가구 비율</span></section><section><strong>54.9%</strong><span>혼자 여가를 보내는 사람</span></section><section><strong>15.8%</strong><span>WHO 발표, 외로움을 경험한 인구</span></section></div><p class="document-note">감성 챗봇 Replika와 감정형 로봇 LOVOT처럼 외로움을 달래는 기술도 상용화되고 있다.</p></div>`
      },
      {
        label: 'Observation plan',
        html: `<div class="archive-document"><p class="document-code">03 / 관찰 조사 계획</p><h2>겉으로 보이지 않는<br>외로움을 기록하기</h2><p class="lead-copy">현장 관찰만으로는 외로움을 분석하기 어렵다고 판단해 자기기록과 상호관찰을 함께 진행했다.</p><div class="subject-grid"><section><b>A</b><p>외로움을 가장 예민하게 느끼며 주로 밖에서 경험한다.</p></section><section><b>B</b><p>중간 정도로 느끼며 집 안과 밖 모두에서 경험한다.</p></section><section><b>C</b><p>거의 느끼지 않지만 주로 집 안에서 경험한다.</p></section></div><dl class="place-list"><div><dt>축제 주점</dt><dd>친목을 다지는 장소에서 연결되지 못하는 외로움</dd></div><div><dt>단체 식당</dt><dd>주변과 대비되며 고립감이 심화되는 외로움</dd></div><div><dt>과실</dt><dd>사회적으로 연결돼 있지만 친밀함이 없는 외로움</dd></div></dl></div>`
      }
    ],
    [
      {
        label: 'ESM method',
        html: `<div class="archive-document"><p class="document-code">04 / 자기기록 · ESM 경험표집법</p><h2>일상의 순간을<br>실시간으로 수집하다</h2><p class="lead-copy">경험표집법은 참가자가 일상생활 중 특정 시간이나 신호에 맞춰 자신의 생각, 감정, 행동과 환경을 기록하는 방법이다.</p><div class="measure-grid"><div><span>자발성</span><b>수동 ↔ 능동</b></div><div><span>접촉도</span><b>고립 ↔ 접촉</b></div><div><span>참여도</span><b>관망 ↔ 참여</b></div><div><span>연결감</span><b>단절 ↔ 연결</b></div><div><span>소속감</span><b>겉돎 ↔ 소속</b></div><div><span>표현 가능성</span><b>억제 ↔ 표현</b></div><div><span>관계 대칭성</span><b>일방 ↔ 상호</b></div><div><span>주관식</span><b>감정과 맥락</b></div></div></div>`
      },
      {
        label: 'ESM record',
        html: `<div class="archive-document"><p class="document-code">05 / ESM 작성 예시</p><h2>관계의 밀도와<br>감정의 온도</h2><dl class="meta-list"><div><dt>작성자</dt><dd>A</dd></div><div><dt>시간</dt><dd>10월 3일 오후 1시</dd></div><div><dt>상황</dt><dd>고등학교 친구 3명과 카페</dd></div></dl><div class="esm-scale"><span>연결감</span><div><i style="--score:34%"></i></div><b>조금 고립</b></div><blockquote class="record-quote">“오랜만에 만나서 재밌을 것 같았는데 나 빼고 둘이서 아는 이야기를 할 때가 많아서 서운했음.”</blockquote><div class="record-analysis"><span>관찰자의 메모</span><p>같은 자리에 함께 있는 것만으로 연결감이 생기지는 않았다. 대화의 공유 범위와 상대의 주의가 소속감에 영향을 주었다.</p></div></div>`
      }
    ],
    [
      {
        label: 'Observation results',
        html: `<div class="archive-document"><p class="document-code">06 / 관찰 조사 결과</p><h2>기록을 비교해<br>반복되는 장면 찾기</h2><div class="observation-matrix"><section><span>함께 있음</span><strong>높음</strong><p>가족과 식사하거나 모임에 참여했지만 피로와 불편함을 동시에 기록했다.</p></section><section><span>대화 참여</span><strong>높음</strong><p>팀 활동에 적극적이어도 자신의 의견이 반영되지 않으면 소속감을 느끼지 못했다.</p></section><section><span>혼자 있음</span><strong>편안함</strong><p>혼자 책을 읽으며 외로움을 느꼈지만 사람을 만나고 싶지는 않다고 기록했다.</p></section><section><span>표현 가능성</span><strong>낮음</strong><p>가족과 친구처럼 가까운 관계에서도 눈치를 보면 외로움이 커졌다.</p></section></div><p class="change-line"><span>분석 방향</span> 외로움을 사람 수가 아니라 연결감·소속감·표현 가능성의 조합으로 본다.</p></div>`
      },
      {
        label: 'ESM analysis',
        html: `<div class="archive-document"><p class="document-code">07 / ESM 자기기록 분석</p><h2>다섯 가지<br>핵심 발견</h2><ol class="finding-list"><li><span>01</span><p><strong>너무 많은 연결도 부담이 될 수 있다.</strong> 부모님과의 식사에서 연결감은 높았지만 피곤함을 느낀 B.</p></li><li><span>02</span><p><strong>외로워도 만남을 원하지 않을 수 있다.</strong> 혼자 책을 읽으며 외롭지만 밖에 나가고 싶지 않은 B.</p></li><li><span>03</span><p><strong>상대의 마음을 추측하며 외로워진다.</strong> 본인이 불편하면 상대도 불편할 것이라 판단한 A.</p></li><li><span>04</span><p><strong>소속감의 기준은 사람마다 다르다.</strong> 팀플에 참여해도 소속감을 느끼지 못한 A.</p></li><li><span>05</span><p><strong>편하지 않으면 가까운 관계도 외롭다.</strong> 친한 친구 앞에서도 눈치를 본 B.</p></li></ol></div>`
      }
    ],
    [
      {
        label: 'Field observation',
        html: `<div class="archive-document"><p class="document-code">08 / 현장 관찰 분석</p><h2>본 것, 보지 못한 것,<br>들은 말</h2><div class="field-columns"><section><span>본 것</span><h3>관심의 방향이 연결감에 영향을 준다.</h3><p>세 명 중 두 명이 눈을 맞추며 이야기하자 남은 한 명은 머리카락을 정리하기 시작했다. 네 명이 각자 휴대폰을 보면서도 어색함이 없는 테이블도 있었다.</p></section><section><span>보지 못한 것</span><h3>휴대폰을 전혀 만지지 않는 테이블</h3><p>어떤 테이블이든 한 번 이상 휴대폰을 사용했다. 그러나 휴대폰 사용 자체가 단절을 의미하지는 않았다.</p></section><section><span>들은 말</span><h3>“뭔데뭔데” · “내 얘기 듣고 있어?”</h3><p>친구의 화면을 함께 보거나 상대의 주의를 확인하는 말이 반복됐다.</p></section></div></div>`
      },
      {
        label: 'Final insight',
        html: `<div class="archive-document insight-page"><p class="document-code">09 / 관찰 조사 최종 인사이트</p><h2>연결의 양보다<br>관계의 조건</h2><p class="insight-lead">많은 사람과 연결되어 있어도 피로감이나 외로움을 느낄 수 있고, 대화 없이 각자 시간을 보내더라도 편안한 관계가 존재했다.</p><p>외로움을 느끼면서도 사람을 만나고 싶지 않은 경우가 있었고, 활동에 적극적으로 참여하면서도 소속감을 느끼지 못하기도 했다. 변수들이 불일치해도 외롭지 않은 사례가 있었다.</p><div class="insight-equation"><span>연결감</span><i>+</i><span>소속감</span><i>+</i><span>편안함</span><i>+</i><span>표현 가능성</span></div><p class="change-line"><span>다음 질문</span> 다른 변수가 부족해도 외로움을 낮추는 ‘메인 변수’는 무엇인가?</p></div>`
      }
    ],
    [
      {
        label: 'STEEP · Social',
        html: `<div class="archive-document"><p class="document-code">10 / STEEP 데스크리서치 · 사람 S</p><h2>개인의 증가와<br>관계 진입의 경계</h2><div class="research-list"><section><h3>1인 가구와 혼자 보내는 시간의 증가</h3><p>2024년 1인 가구는 804만 5천 가구, 전체의 36.1%다. 청년 1인 가구가 타인과 교류하는 시간은 하루 평균 74분이며 가족과 보내는 시간은 약 5분이었다.</p></section><section><h3>Z세대와 수평적 개인주의</h3><p>개인의 자율성을 중시하면서도 SNS 비교 환경 속 경쟁과 자기 평가의 압박을 경험한다.</p></section><section><h3>참여 경계가 만날 사람을 결정한다</h3><p>당근 모임의 연령·지역·가입 승인, 서로 다른 계층 간 만남의 기회 차이는 관계망 진입 범위를 제한한다.</p></section><section><h3>열린 일상 공간의 역할</h3><p>OECD는 공원·도서관·카페가 서로 다른 배경의 교류 장벽을 낮추고 공동체 소속감을 높일 수 있다고 설명한다.</p></section></div><p class="document-note">인사이트 · 개인 활동은 늘지만 서로 다른 집단과 관계를 만들려는 움직임도 함께 나타난다.</p></div>`
      },
      {
        label: 'STEEP · Technology',
        html: `<div class="archive-document"><p class="document-code">11 / STEEP 데스크리서치 · 기술 T</p><h2>독립적으로 관계 맺는<br>AI의 가능성</h2><div class="research-list compact"><section><h3>에이전틱 AI</h3><p>목표를 분석해 작업을 나누고 실행하며 여러 에이전트가 협업해 의사결정을 지원한다.</p></section><section><h3>월드 모델</h3><p>영상과 공간 정보를 학습해 환경 변화와 행동 결과를 예측한다.</p></section><section><h3>AI-LOVI</h3><p>설문·대화·생체신호 기반 외로움 지수를 결합해 감정과 행동 신호를 종합 평가한다.</p></section><section><h3>다감각 AI</h3><p>시각·후각·미각·촉각 정보를 센서로 분석해 사람의 상태를 더 폭넓게 인식한다.</p></section><section><h3>Emo-LiveSync</h3><p>음성에 맞춰 디지털 인물의 표정과 몸동작을 실시간 생성한다.</p></section></div><p class="document-note">인사이트 · 별도의 지시 없이 판단하는 기술이 발전하며 AI가 사람과 독립적으로 관계 맺을 가능성이 커진다.</p></div>`
      }
    ],
    [
      {
        label: 'STEEP · Environment',
        html: `<div class="archive-document"><p class="document-code">12 / STEEP 데스크리서치 · 환경 E</p><h2>환경의 개인화가<br>삶을 바꾸다</h2><div class="research-list"><section><h3>재택근무와 혼자 보내는 시간</h3><p>재택근무 가능 직종의 근로자는 혼자 보내는 시간이 하루 평균 1.1시간 늘고 대면 접촉은 줄었다.</p></section><section><h3>동네 환경과 외로움</h3><p>공원·녹지와의 접촉은 낮은 외로움과 관련됐으며 공공공간, 복합 토지 이용, 벤치는 이웃과의 접근성에 영향을 준다.</p></section><section><h3>단골가게의 사회적 기능</h3><p>사회적으로 교류하는 단골가게는 지역사회 유대와 밀접하다. 반면 슈퍼마켓과 전통시장은 줄고 무인매장과 프랜차이즈가 늘었다.</p></section><section><h3>공간 접근 권한의 차이</h3><p>거주 형태에 따라 출입과 공용시설 이용 권한이 달라지며 같은 단지에서도 만남의 기회가 구분된다.</p></section></div><p class="document-note">인사이트 · 환경이 먼저 개인화되며 인간의 생활 방식도 개인 중심으로 변했다.</p></div>`
      },
      {
        label: 'STEEP · Economy',
        html: `<div class="archive-document"><p class="document-code">13 / STEEP 데스크리서치 · 경제 E</p><h2>외로움이 소비와<br>관계 접근을 바꾸다</h2><div class="number-grid number-grid--two"><section><strong>80%</strong><span>홧김에 낭비한 경험</span></section><section><strong>71%</strong><span>외로움을 달래기 위한 불필요한 소비 경험</span></section></div><div class="research-list"><section><h3>감정 문제를 넘어 경제적 손실로</h3><p>외로움은 업무 능력과 생산성 저하, 결근과 퇴사로 이어져 기업과 사회의 비용을 만든다.</p></section><section><h3>Soho House의 유료 관계망</h3><p>회원비와 가입 심사, 운영 규칙이 네트워크에 참여할 수 있는 범위를 결정한다.</p></section><section><h3>타임뱅킹</h3><p>다른 사람에게 제공한 활동 시간을 크레딧으로 적립해 금전이 아닌 시간과 기여를 교환한다.</p></section></div><p class="document-note">인사이트 · 개인은 외로움에 초점을 두고 소비하기 시작했다.</p></div>`
      }
    ],
    [
      {
        label: 'STEEP · Policy',
        html: `<div class="archive-document"><p class="document-code">14 / STEEP 데스크리서치 · 정책 P</p><h2>고립을 넘어<br>연결된 외로움으로</h2><div class="policy-timeline"><section><span>2021 · 일본</span><p>고독·고립 대책 담당 장관과 민관협력 플랫폼을 마련했다.</p></section><section><span>2023 · 한국</span><p>제1차 고독사 예방 기본계획을 수립해 위험군 발굴과 사회적 관계망 형성을 지원한다.</p></section><section><span>2025 · 서울</span><p>‘서울마음편의점’을 통해 진단·상담·소모임과 여가활동을 제공한다.</p></section><section><span>2025 · WHO</span><p>폭염 대응에서 1인 가구 등 취약 이웃의 안부 확인과 생활권 관계망을 강조했다.</p></section><section><span>2026 · EU</span><p>공동체의 개방적 참여와 운영·의사결정 권한의 자격을 구분한다.</p></section></div><p class="document-note">인사이트 · 정책은 고립된 사람에 집중하고, 사회적으로 연결된 사람의 외로움은 충분히 다루지 않는다.</p></div>`
      },
      {
        label: 'STEEP · Final insight',
        html: `<div class="archive-document final-research"><p class="document-code">15 / STEEP 데스크리서치 · 최종 인사이트</p><h2>자율성을 유지하며<br>교류하는 공동체</h2><p class="insight-lead">1인 가구 증가와 비대면 기술의 발전으로 타인과 직접 접촉하지 않아도 생활할 수 있는 환경이 확대되고 있다.</p><div class="long-copy"><p>한편 외로움과 고립에 대응하기 위한 개인의 소비와 사회적 지원도 증가하면서 독립적인 생활과 관계 형성에 대한 필요성이 동시에 나타나고 있다.</p><p>기술을 통한 연결 가능성과 공공·민간의 관계 형성 지원이 확대되는 가운데, 개인의 자율성을 유지하면서도 타인과 교류할 수 있는 새로운 공동체 방식이 필요해지고 있다.</p></div><div class="final-question"><span>Design question</span><p>사회적으로 연결되어 있지만 소속감을 느끼지 못하는 사람을 위해, 관계의 양이 아니라 편안함과 표현 가능성을 높이는 경험을 어떻게 설계할 수 있을까?</p></div></div>`
      }
    ]
  ];
  const spreads = bookNumber === 1 ? bookOneSpreads : defaultSpreads;
  const totalPages = spreads.length * 2;
  const totalPageLabel = String(totalPages).padStart(2, '0');

  root.innerHTML = `
    <section class="reader-shell" style="--accent:${accent}" aria-label="${title} 전자책 리더">
      <header class="reader-bar">
        <span class="reader-brand">IZA / Digital reader</span>
        <span class="reader-title">${title}</span>
        <span class="reader-progress" aria-live="polite">01—02 / ${totalPageLabel}</span>
      </header>
      <div class="book-stage">
        <div class="book-spread">
          <article class="page page--left"></article>
          <article class="page page--right"></article>
        </div>
      </div>
      <footer class="reader-controls">
        <button class="prev-button" type="button" aria-label="이전 페이지">← Previous</button>
        <span>Click a page or use arrow keys</span>
        <button class="next-button" type="button" aria-label="다음 페이지">Next →</button>
      </footer>
    </section>`;

  const leftPage = root.querySelector('.page--left');
  const rightPage = root.querySelector('.page--right');
  const progress = root.querySelector('.reader-progress');
  const previousButton = root.querySelector('.prev-button');
  const nextButton = root.querySelector('.next-button');
  let currentSpread = 0;
  let isTurning = false;

  function pageMarkup(page, number) {
    return `<div class="page-head"><span>${page.label}</span><span>IZA ${bookIndex}</span></div><div class="page-content">${page.html}</div><span class="page-number">${String(number).padStart(2, '0')}</span>`;
  }

  function renderSpread() {
    const [left, right] = spreads[currentSpread];
    const firstPage = currentSpread * 2 + 1;
    leftPage.innerHTML = pageMarkup(left, firstPage);
    rightPage.innerHTML = pageMarkup(right, firstPage + 1);
    progress.textContent = `${String(firstPage).padStart(2, '0')}—${String(firstPage + 1).padStart(2, '0')} / ${totalPageLabel}`;
    previousButton.disabled = currentSpread === 0;
    nextButton.disabled = currentSpread === spreads.length - 1;
  }

  function turnPage(direction) {
    const nextSpread = currentSpread + direction;
    if (isTurning || nextSpread < 0 || nextSpread >= spreads.length) return;
    isTurning = true;
    const outgoing = direction > 0 ? rightPage : leftPage;
    const outgoingClass = direction > 0 ? 'page--turn-out-next' : 'page--turn-out-prev';
    const incomingClass = direction > 0 ? 'page--turn-in-next' : 'page--turn-in-prev';
    outgoing.classList.add(outgoingClass);

    window.setTimeout(() => {
      outgoing.classList.remove(outgoingClass);
      currentSpread = nextSpread;
      renderSpread();
      const incoming = direction > 0 ? rightPage : leftPage;
      incoming.classList.add(incomingClass);
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => incoming.classList.remove(incomingClass)));
      window.setTimeout(() => { isTurning = false; }, 600);
    }, 310);
  }

  previousButton.addEventListener('click', () => turnPage(-1));
  nextButton.addEventListener('click', () => turnPage(1));
  leftPage.addEventListener('click', () => turnPage(-1));
  rightPage.addEventListener('click', () => turnPage(1));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') turnPage(-1);
    if (event.key === 'ArrowRight') turnPage(1);
  });

  renderSpread();
}
