import { useState, useRef, createRef } from "react";
import { useStore } from "../../store";
import { Upgrade } from "../../model/trigger";

interface OwnProp {
  units: string[];
  setMovedLeft: (prev: Upgrade) => void;
}

const VocabDisplay: React.FC<OwnProp> = ({ units, setMovedLeft }) => {
  const setCurrentPosition = useStore((store) => store.setCurrentPosition);
  const refScreen = useRef<HTMLDivElement>(null);

  const vocabs = useStore((store) => [
    store.first,
    store.second,
    store.third,
    store.completed,
  ]);

  const vocabID = useStore((store) => store.vocabID);
  const [first, second, third, completed] = vocabs;
  const setUpdate = useStore((store) => store.setUpdate);
  const clearData = useStore((store) => store.clearData);
  // console.log(first, vocabID);

  function clickHandler() {
    // console.log("clicked");
    const one = JSON.parse(`[
            {
                "title": "Capabilities",
                "description": "능력, 역량\\n킵어-빌리티\\n\\nOur company's production capabilities greatly increased in the last year.\\n우리 회사의 생산 능력은 지난 해에 상당히 증가했다.\\n\\nManaging the office is beyond her capability.\\n사무실 관리는 그녀의 능력 밖의 일입니다.\\n\\nI don't think he has the capability of handling so much work.\\n그에게 그렇게 많은 일을 처리할 수 있는 능력이 있다고 생각되지 않습니다.",
                "id": 219
            },
            {
                "title": "Pleasant",
                "description": "즐거운, 쾌적한\\n플레젠트\\n\\nThat present was a very pleasant surprise.\\n그 선물은 뜻밖의 기쁨이었습니다.\\n\\nThe addition of a sunny, pleasant seating area is a definite improvement to the lobby.\\n로비에서 명백히 개선된 부분은 햇빛이 잘 드는 데다가 쾌적한 좌석 배치입니다.\\n\\nThe weather is pleasant today, so let's go to the park.\\n오늘 날씨가 화창하니 공원에 갑시다.\\n\\nI just went for a pleasant walk on the beach.\\n해변으로 기분 좋은 산책을 나갔습니다.\\n\\n========================\\n\\nUnpleasant\\n불쾌한, 불편한\\n\\nIt is unpleasant to work in an office where interpersonal relationships break down.\\n직원들 사이의 관계가 좋지 않은 사무실에서 일하기란 불편한 일입니다.\\n\\nThe humidity in Japan can be very unpleasant.\\n\\nWe found the meeting rooms at the resort reasonable but the room accommodations cramped and unpleasant.\\n휴양지의 회의실은 괜찮았지만 숙박 시설은 좁고 불편했다.\\n\\n",
                "id": 278
            },
            {
                "title": "Compose",
                "description": ">> Compose\\n구성하다\\n\\nThe USA is composed of 50 states.\\nUSA는 50개의 주로 구성되어있다.\\n\\nEarth and Mars compose the inner planets.\\n지구, 화성은 내행성을 구성한다.\\n\\nMen compose the majority of the armed services.\\n남자는 대부분 군복무를 합니다.\\n\\nThis salad is composed of tomatoes and lettuce.\\n이 샐러드는 토마토와 양상치로 이루어져 있습니다.\\n\\n>> Comprise\\n~을 구성하다, 포함하다\\n\\nThe European Union comprises 27 countries.\\n\\nWomen comprise around 75% of the country's school teacher population.\\n\\n전체 + comprise + 부분\\n부분 + compose + 전체\\n\\n>> Consist\\n이 단어도 구성되다인데 of가 꼭 따라가야된다.\\n\\nMy essay consists of five paragraph\\n내 에세이는 다섯 문단으로 구성되어있다.\\n\\nMy essay is composed of five paragraphs.",
                "id": 190
            },
            {
                "title": "regulate",
                "description": "규제하다, 통제하다, 단속하다, 조절하다\\n\\nThe hormone insulin helps regulate blood sugar levels.\\n\\nThe production and sale of medicine in the US is regulated by the Food and Drug Administration.\\n미국에서 약의 생산과 판매는 식품 의약품국에 의해 규제된다.\\n\\nThis control regulates the temperature in the house.\\n이 제어 장치는 집 안에서의 온도를 조절한다.\\n\\nIn the US, traffic law is regulated by each state government.\\n미국에서 교통법은 각 주 정부에 의해 규제된다.\\n\\n============================\\nregulation\\n규정, 규칙, 규제\\n\\nUnder the new regulations, e-scooters will no longer be allowed on sidewalks.\\n새로운 규제들에 따라, 전동스쿠터들은 더는 인도 위에 허용되지 않을 것이다.\\n\\nThe Spanish government has introduced new regulations to reduce the country's energy consumption.\\n스페인 정부는 그 나라의 에너지 소비량을 줄이기 위해 새로운 규제들을 도입했다.\\n\\nDrivers should follow traffic regulations for their safety.\\n운전자들은 자신의 안전을 위해 교통 규정을 따라야 한다.\\n\\n",
                "id": 285
            },
            {
                "title": "dynamic",
                "description": "활발한, 정력적인\\n다이-에믹\\n\\nIt's great working for such a dynamic and innovative company.\\n\\nDeregulation of the trucking and shipping sectors have helped make the economy in the region more dynamic.\\n운송업 분야의 규제철폐로 지역경제가 더욱 활성화 되었습니다.",
                "id": 257
            },
            {
                "title": "deceive",
                "description": "디-시브\\n속이다\\n\\ndeceived\\n속다\\n\\n말이나 행동으로 남을 속여서, 자신의 목적을 이룰 때 사용합니다. 예를 들어, 사실을 숨기거나 거짓 정보를 통해 '속이다'\\n\\n>> (of a person) cause (someone) to believe something that is not true, typically in order to gain some personal advantage.\\nI didn't intend to deceive people into thinking it was French champagne\\n\\n>> (of a thing) give a mistaken impression.\\nthe area may seem to offer nothing of interest, but don't be deceived\\n\\nenabling the rulers to deceive themselves about the nature of their own rule",
                "id": 242
            },
            {
                "title": "Accuracy",
                "description": "정확, 정확성, 정확도\\n에큐-레시\\n\\nExperts have long debated the accuracy and fairness of intelligence tests.\\n전문가들은 지능 검사들의 정확성과 공평성을 오래 논의해왔다.\\n\\nBetter equipment will allow us to predict the weather with greater accuracy.\\n더 나은 장비는 우리가 날씨를 더 좋은 정확성으로 예측하는 것을 가능하게 할 것이다.\\n\\nAccurately\\n정확히\\n에큐-읏리\\n\\nAccurate\\n정확한\\n에큐-ㄹ에트\\n\\nI don't think this show is very historically accurate.\\n나는 이 프로가 역사적으로 아주 정확하다고 생각하지 않는다\\n\\nYou will contribute unit and functional tests to certify your work is accurate.",
                "id": 160
            },
            {
                "title": "Release",
                "description": "출시하다, 공개하다, 발매하다, 발표하다, 개봉하다\\n\\nThe first version of the iPhone was released in 2007.\\n아이폰의 첫 번째 버전은 2007년에 출시되었다.\\n\\nA new version of this game is released every year.\\n이 게임의 새로운 버전은 매해 출시된다.\\n\\nThe new movie will be released next month.\\n새 영화는 다음 달에 개봉될 것이다.\\n\\nThe band confirmed that they will be releasing a new album.\\n그 밴드는 그들이 새로운 앨범을 공개할 것이라고 확인해 줬다.\\n\\nThe company released sales information today.\\n그 회사는 판매 정보를 오늘 공개했다.",
                "id": 216
            },
            {
                "title": "estimate",
                "description": "추정하다, 예측하다, 평가하다, 값을 매기다\\n\\nThe movie was estimated to have cost $380 million.\\n그 영화는 3억 8천만 달러가 든 것으로 추정됐다.\\n\\nIt's estimated that around 8 million tons of plastic waste enters the ocean each year.\\n매해 약 팔백만 톤의 플라스틱 폐기물이 바다에 들어가는 것으로 추정된다.\\n\\nIt is estimated that air pollution causes over 4 million premature deaths each year.\\n공기 오염이 매해 400만 건 넘는 조기 사망들을 일으킨다는 것이 추정된다.\\n\\nThe WHO estimates that second-hand smoke exposure causes 1.2 million deaths per year.\\n세계 보건 기구는 간접흡연 노출이 한 해에 120만 건의 사망들을 일으킨다고 추정한다.",
                "id": 256
            },
            {
                "title": "Exposure",
                "description": "노출\\n엑스-포-슈어\\n\\nExposure to radiation can cause cancer.\\n방사선에 노출되는 것은 암을 유발할 수 있다.\\n\\nThe colors of these boxes have already faded from exposure to sun and rain.\\n햇빛과 비에 노출되어 이 상자들은 벌써 색이 바랬습니다.\\n\\nA hat and sunglasses can limit one's exposure to the sun.\\n모자와 선글라스는 한사람이 햇빛에 노출되는 것을 제한할 수 있다.",
                "id": 138
            },
            {
                "title": "fascinating",
                "description": "대단히 흥미로운, 매력적인, 흥미진진한\\n풰스-네이링\\n\\nAncient Greek history is absolutely fascinating!\\n고대 그리스 역사는 완전히 흥미진진하다!\\n\\nThe architectural details of the building are quite fascinating.\\n그 건물의 건축학적인 세부 사항들은 꽤 흥미롭다.\\n\\nI find ancient history fascinating.\\n나는 고대의 역사가 대단히 흥미롭다고 생각한다.\\n\\nMy baby finds nature fascinating.\\n내 아기는 자연이 대단히 흥미롭다고 생각한다.",
                "id": 296
            },
            {
                "title": "adhere",
                "description": "지키다, 준수하다\\n엗-히얼\\n\\nAll staff must adhere to safety guidelines when operating machinery.\\n모든 직원은 기계를 작동시킬 때 안전 지침에 반드시 충실해야 한다.\\n\\nAre you sure that the proposed advertising campaign adheres to the best practices laid out in our corporate handbook?\\n광고 캠페인 제안이 회사의 핸드북에 제시되어있는 최선의 실행관행을 준수합니까?\\n\\nIt's important to adhere to official procedures in a hospital.\\n병원에서는 공식 절차를 지키는 것이 중요합니다.\\n\\nThat company does not always adhere to the regulations and has been fined in the past.\\n그 회사는 과거에 규정을 준수하지 않은 데에 대한 벌금을 부과 받은 적이 있습니다.\\n\\n",
                "id": 282
            },
            {
                "title": "Tender",
                "description": "상냥한, 부드러운\\n\\nTenderness\\n\\nAll babies need tender loving care.\\n모든 아기는 부드러운 사랑의 손길로 돌봐야 합니다.\\n\\nShe gave her son a tender kiss.\\n그녀는 아들에게 부드러운 입맞춤을 했습니다.\\n\\nThe gardener is treating her plants with tender care.\\n정원사가 식물들을 정성스럽게 돌보고 있습니다.\\n\\nHe always treated her with tenderness and empathy.\\n그는 그녀를 항상 다정함과 공감으로 대한다.",
                "id": 210
            },
            {
                "title": "Delighted",
                "description": "매우 기뻐하는\\n디-라잇-트드\\n\\nI was delighted to hear that I passed the exam.\\n나는 내가 시험에 통과했다는 것을 듣고 매우 기뻤다.\\n\\nShe was delighted when she ran into her old friend.\\n그녀는 옛 친구를 우연히 만나서 매우 기뻤다.\\n\\nThey were delighted at the birth of their first child.\\n그들은 그들의 첫 아이의 출생에 매우 기뻤다.",
                "id": 130
            },
            {
                "title": "Criticize",
                "description": "비난하다, 비판하다\\n크릿-사이\\n\\nI don't like it when people criticize my work.\\n나는 사람들이 내 일을 비판할 때를 좋아하지 않는다.\\n\\nAn editorial in The New York Times criticized the proposed tax changes.\\n뉴욕 타임스에 있던 사설은 제안된 세금 변경 사항들을 비판했다.\\n\\nMy mother-in-law always criticizes how I parent my kids and tells me what she thinks I'm doing wrong.\\n우리 시어머니께서 항상 내가 나의 아이들에게 어떻게 부모의 역할을 하는지 항상 비난하시고 내가 무엇을 잘못한다고 생각하는지 말해주신다.\\n\\n",
                "id": 78
            },
            {
                "title": "convenient",
                "description": "편리한, 간편한\\n컨붸니언트\\n\\nWhen is a convenient time for us to meet?\\n저희가 만나기 편리한 시간은 언제인가요?\\n\\nThe subway is the most convenient way to get downtown.\\n지하철이 시내로 가는 가장 간편한 방법입니다.\\n\\nMobile phones are extremely convenient.\\n휴대전화는 매우 간편하다.\\n",
                "id": 247
            },
            {
                "title": "Functional",
                "description": "기능적인, 실용적인\\nfunctionality\\n\\nMy clothes have to be fashionable, but also functional.\\n제 옷은 세련되면서 실용적이어야 합니다.\\n\\nOffice furniture must be functional, but it doesn't need to be attractive.\\n사무실 가구는 반드시 실용적이어야 하지만 매력적일 필요는 없다.\\n\\nYour floor plan is functional because people who work together are close to each other.\\n당신의 평면도는 아주 기능적이다. 같이 일하는 사람들이 서로 가까이 배치되어 있기 때문이다.\\n\\nThe bathroom is small, but it's very modern and functional.",
                "id": 134
            },
            {
                "title": "Distribute",
                "description": "배포하다, 분배하다, 유통하다\\n디스트리븃\\n\\nThe goods will be distributed by truck.\\n상품은 트럭으로 배포될 것이다.\\n\\nHelp should be distributed fairly.\\n도움은 공정하게 나뉘어야 한다.\\n\\nWe will distribute various demos of new software to people present at the exposition.\\n우리는 새로운 소프트웨어의 다양한 데모들을 박람회에 참석한 사람들에게 배포할 것이다.",
                "id": 141
            },
            {
                "title": "Defect",
                "description": "Defect\\n결함\\n\\nMy computer has some kind of defect.\\n내 컴퓨터는 결함이 있습니다.\\n\\nWe might have to recall the product because of defects.\\n결함 때문에 그 제품을 리콜해야 할 지도 모릅니다.\\n\\nDefective\\n결함 있는, 결점이 있는\\n\\nThere is no warranty on my defective computer monitor because five years have passed since purchase.\\n\\n구매한 지 5 년이 지났기 때문에 고장난 내 컴퓨터 모니터는 보증 서비스를 받지 못합니다.",
                "id": 79
            },
            {
                "title": "intend",
                "description": "~할 작정이다, ~할 생각이다, 의도하다\\n인-텐드\\n\\nI intend to eat a more healthy diet this year.\\n올해는 더 건강한 식단을 섭취할 작정이다.\\n\\nWe originally intended to go out but ended up staying home.\\n우리는 원래 외출할 생각이었는데 결국 집에 머무르게 되었다.\\n\\nThe company intends to let fifty more people go.\\n회사는 50명을 더 해고할 작정이다.\\n\\nI didn't intend to send that email to everyone.\\n나는 그 이메일을 모두에게 보낼 생각은 아니었다.\\n\\nU.S. President Obama intends to meet with Japanese Prime Minister Abe.\\n미국 대통령 오바마는 일본 총리 아베와 만날 작정이다.\\n\\nWhether intended or not, many social problems are well-hidden and invisible to us.\\n의도했든지 아니든지, 많은 사회 문제들은 잘 숨겨졌고 우리에게 보이지 않는다.\\n",
                "id": 244
            },
            {
                "title": "Indecisive",
                "description": "망설이는, 우유부단한, 이도 저도 아닌 (형용사)\\nin 인 di 디 sai 사이 si 시 v 브\\n\\nindecisively - 망설이면서, 우유부단하게, 이도 저도 아니게\\nindecision - 망설임, 주저함, 우유부단함 (명사)\\n\\nI'm a very indecisive person.\\n\\n나는 무척 우유부단한 사람이다.\\n\\nStop being so indecisive and pick a restaurant.\\n\\n",
                "id": 80
            },
            {
                "title": "certify",
                "description": "인증하다\\n\\nAll of our staff have been certified as diving instructors.\\n저희 직원은 모두 다이빙 강사 자격증을 취득하였습니다.\\n\\nThe lawyer certified the contract during the negotiation.\\n변호사는 협상 중에 계약을 인증했습니다.\\n",
                "id": 191
            },
            {
                "title": "Maintenance",
                "description": "유지보수, 정비, 유지\\n\\nRegular car maintenance can help avoid breakdowns.\\n정기적인 자동차 정비는 고장을 방지하는 데 도움이 될 수 있다.\\n\\nThis price covers everything, including maintenance costs.\\n이 가격은 유지보수 비용을 포함해, 모든 것을 포함합니다.",
                "id": 128
            },
            {
                "title": "motivated ",
                "description": "의욕이 높은, 동기 부여된, 자극받은\\n\\nMost of my colleagues are highly motivated.\\n내 동료들의 대부분은 의욕적이 높다.\\n\\nWe're looking for motivated writers to join our team.\\n우리는 우리의 팀에 합류할 동기 부여된 작가를 찾고 있다.\\n\\nHighly motivated employees are critical to a company's success.\\n의욕적인 직원들은 한 기업이 성공하는 데 매우 중요하다.",
                "id": 224
            },
            {
                "title": "Factor",
                "description": "요인, 요소\\n\\nLocation was an important factor in my decision to accept this job.\\n위치는 이 일자리를 수락하기로 한 내 결정에 중요한 요인이었다.\\n\\nWhen shopping, the most important factor to me is the price.\\n쇼핑할 때 나에게 가장 중요한 요소는 가격이다.\\n\\nLack of exercise is a significant factor in weight gain.\\n운동 부족은 체중 증가에 커다란 요인이다.",
                "id": 126
            },
            {
                "title": "Empathy",
                "description": "공감\\n엠페튀\\n\\nHe always treated her with tenderness and empathy.\\n그는 그녀를 항상 다정함과 공감으로 대한다.\\n\\nHe showed empathy for his troubled friend.\\n그는 그의 불안해하는 친구에게 공감을 나타냈다.",
                "id": 209
            },
            {
                "title": "best practices",
                "description": "모범 사례\\n\\nIt means to do something using the best, most well-known method available.\\n\\nUse software engineering best practices to ensure a high standard of quality for all team deliverables.",
                "id": 276
            },
            {
                "title": "Deprecated",
                "description": "더이상 사용되지 않음 (컴퓨터 용어)\\n\\n\\"중요도가 떨어져 더 이상 사용되지 않고 앞으로는 사라지게 될\\"\\n\\n일반적으로 더 이상 효율적이거나 안전치 않거나 다른 것에 의해 대체되었다는 이유 등으로 사용을 금지시키거나..",
                "id": 97
            },
            {
                "title": "Combine",
                "description": "결합하다, 병행하다, 합치다\\n\\nLet's combine our efforts to solve the problem.\\n그 문제를 해결하기 위해 우리의 노력을 합칩시다.\\n\\nNext, you need to combine all of the dry ingredients and mix thoroughly.\\n다음으로, 모든 마른 재료들을 합치고 완전히 섞어야 합니다.\\n\\nTheir music combines elements of reggae and blues.\\n그들의 음악은 레게와 블루스의 요소들을 결합한다.",
                "id": 202
            },
            {
                "title": "rely",
                "description": "의지하다, 의존하다\\n뤠-라이\\n\\nNewspapers rely on advertising for most of their revenue.\\n신문사들은 그들 수입의 대부분을 광고에 의존한다.\\n\\nThe country's economy relies on trade with the European Union.\\n그 나라의 경제는 유럽 연합과의 무역에 의존한다.\\n\\nBaby penguins rely on their mothers for food and warmth.\\n새끼 펭귄들은 음식과 온기를 위해 그들의 어미에게 의존한다.\\n\\nSome experienced designers still prefer to begin with hand drawings rather than relying on computers.\\n일부 경험이 풍부한 디자이너들은 컴퓨터에 의존하는 대신에 손으로 그리는 것으로 시작하는 것을 여전히 선호한다.\\n\\n",
                "id": 284
            },
            {
                "title": "Fundamental",
                "description": "근본적인, 기본적인, 1. 근본[본질]적인 2. 핵심적인, 필수적인\\n\\nThe most fundamental reason for their failure is their lack of understanding of the market.\\n가장 근본적인 실패원인은 시장에 대한 이해 부족입니다.\\n\\nLearning the alphabet is fundamental for young children.\\n어린 아이들은 기본적으로 알파벳을 배워야 합니다.\\n\\nOne fundamental difference between men and women is their attitude towards shopping.\\n남자와 여자의 기본적인 차이점 중 하나는 쇼핑에 대한 태도입니다.",
                "id": 203
            },
            {
                "title": "claim",
                "description": "주장하다, 요구하다, 청구하다\\n클레임\\n\\nHe claims to have a connection to British royalty.\\n그는 영국 왕족에게 연줄이 있다고 주장한다.\\n\\nSeveral people from the town claim to have seen a UFO in the area.\\n그 마을의 사람들 몇 명은 그 지역에서 유에프오를 봤다고 주장한다.\\n\\nShe claimed that the story was true, but didn't want to reveal her source.\\n그녀는 그 이야기가 진실이라고 주장했지만, 그녀의 정보원을 밝히고 싶지 않았다.\\n\\nFormer President Trump's most extreme supporters still claim he won the 2020 election.\\n전 대통령 트럼프의 가장 극한 지지자들은 아직도 그가 2020년 선거에서 이겼다고 주장한다.\\n\\nTerrorist groups only claim credit for one out of every seven attacks they make.\\n테러리스트 집단은 그들이 자행하는 모든 공격들의 7건 중 1건만 그들의 소행이라고 주장한다.\\n\\nThe lawyer claimed that she was innocent.\\n그 변호사는 그녀가 결백하다고 주장했다.\\n",
                "id": 280
            },
            {
                "title": "Usability",
                "description": "사용성\\n\\n사용자가 얼마나 편하고 즐겁게 기능들을 사용하는가\\n\\n사용성이 결여된 경우,\\n사용자가 원하는 것을 어렵고 불편하게 제공한다.\\n이처럼 유용성은 순기능을 의미하고 이는 비즈니스에서 제공하는 제품과 서비스 본질을 뜻한다.\\n\\n사용성(Usability)은 사용자(user)가 사용자 인터페이스(user interface)를 사용하는데 얼마나 쉬운가를 가늠하는 품질 속성을 뜻한다.",
                "id": 206
            },
            {
                "title": "Principles",
                "description": "원칙, 신념\\n\\nThe basic principle of democracy is that everyone has the right to vote.\\n민주주의의 기본 원칙은 모두가 투표할 권리가 있다는 것이다.\\n\\nBasic marketing principles will be the main focus of this course.\\n기본 마케팅 원칙들이 이 강좌의 주요한 중심이 될 것이다.",
                "id": 120
            },
            {
                "title": "Available",
                "description": "가능한, 구할 수 있는, 이용할 수 있는\\n어-붸일-러블\\n\\nI am available at any time.\\n나는 언제든 가능하다.\\n\\nThe game will be available for purchase online on February 11.\\n그 게임은 2월 11일에 온라인 구매를 위해 이용 가능할 것이다.\\n\\nThe VIP lounge is available to all of our first class passengers.\\n귀빈 라운지는 저희의 일등석 탑승객들 모두에게 이용 가능합니다.\\n\\nDo you have any single rooms available?\\n이용 가능한 1인실이 있습니까?",
                "id": 208
            },
            {
                "title": "Beyond",
                "description": "그 너머에\\n비-연드\\n\\n장소나 시간을 나타내는 명사 외에 추상적인 개념에 사용하여 어떤 행동이나 생각의 범위를 넘길 때.\\n\\nbeyond는 ~을 넘어서,. ~을 지나서와 같이 범위를 넘어섰을경우에 많이 사용\\n\\nThat kindness goes beyond Japan.\\n그런 친절함은 일본을 넘어선다.\\n\\nThis is a problem or issue that you can't move beyond.\\n이것은 당신이 넘어설 수 없는 문제나 쟁점이다.\\n\\nBeing smart, however, goes beyond the classroom.\\n그러나, 똑똑한 것은 교실을 넘어선다.\\n\\nThe Kuiper Belt is an area beyond the planets.\\n카이퍼 벨트는 행성들을 넘어선 공간이다.",
                "id": 220
            },
            {
                "title": "administrator",
                "description": "관리자\\n에드-미니-스트레이럴\\n\\nHe is a very strict administrator.\\n그는 매우 엄격한 관리자입니다.\\n\\nSuccessful administrators must have good organizational skills.\\n관리자로 성공하려면 조직 능력이 뛰어나야 합니다.\\n\\n=========\\nadmin\\n\\n관리자\\n에드-민\\n\\n\\"Admin\\" is just short for \\"administrator\\".",
                "id": 286
            },
            {
                "title": "Associate",
                "description": "연상하다, 연관 짓다\\n\\nMost people associate Italian food with pizza and pasta.\\n사람들 대부분은 이탈리아 음식을 피자와 파스타에 연관 짓는다.\\n\\nDogs can associate words with objects.\\n개들은 단어를 사물과 연상시킬 수 있다.\\n\\nI always used to associate Christmas with winter until I moved to Australia.\\n나는 내가 호주로 이사했을 때까지 크리스마스를 겨울과 항상 연상시키곤 했다.\\n\\nSmoking is closely associated with many serious health problems.\\n흡연은 여러 가지 심각한 건강 문제와 밀접하게 연관되어있다.\\n",
                "id": 131
            },
            {
                "title": "Efficient",
                "description": "효율적인, 능률적인, 유능한\\n어퓌시언트\\n\\nA manufacturing line is an efficient way to produce cars.\\n생산 라인은 자동차를 생산하는 효율적인 방법이다.\\n\\nOur production process is very efficient.\\n우리의 생산 공정은 매우 효율적이다.\\n\\nThe subway is a fast and efficient means of transportation.\\n지하철은 빠르고 효율적인 교통의 수단이다.\\n\\n\\"Using objects is inefficient.\\"\\n객체를 사용하는 것은 비효율적이다.\\n\\neffective\\n어펙티브\\n-효과적인\\n\\neffect\\n어펙트\\n-효과\\n\\n\\n",
                "id": 104
            },
            {
                "title": "confront",
                "description": "정면으로 부딪치다, (문제나 곤란한 상황에) 맞서다\\n\\nI decided it was time to confront my fear of heights and go bungee jumping.\\n\\nI confronted my fear of heights by climbing a mountain.\\n나는 등산을 통해 고소공포증에 맞섰습니다.",
                "id": 272
            },
            {
                "title": "Agile",
                "description": "ag-ile\\n에-지을\\n\\n애자일(Agile)의 사전적 의미는 '날렵한', 민첩한', '기민한' 뜻으로 원래는 소프트웨어 개발 방법론 중 하나인 애자일 프로세스(Agile Process)에서 출발했습니다.",
                "id": 121
            },
            {
                "title": "Basis",
                "description": "근거, 기초\\n\\nWhat's the basis for your theory?\\n당신의 이론은 근거가 무엇입니까?\\n\\nPromotions at my company are made on the basis of one's results.\\n우리 회사에서 승진은 개인의 성과를 바탕으로 이루어진다.\\n\\nImmerse yourself in English on a daily basis and improvement is sure to follow.\\n자신을 매일 영어에 몰두하게 한다면, 반드시 발전이 뒤따를 것이다.\\n\\nRecent reports have suggested that drinking a glass of wine on a regular basis may be beneficial to your health.\\n최근 보도는 주기적으로 한잔의 와인을 마시는 것이 당신의 건강에 좋을 수 있다고 말했다.\\n\\nI believe that trust is the basis for a successful marriage.\\n\\n",
                "id": 165
            },
            {
                "title": "Iterate",
                "description": ">> Iterate\\n반복하다\\nRepeat과의 차이는 repeat은 단순히 반복이라는 말이고 iterate의 경우는 성공적인 결과를 얻을 때까지 반복함의미다.\\n\\nWe iterate production and distribution after each round of customer feedback.\\n저희는 소비자 의견수렴의 매 단계 이후에 생산과 배포를 반복합니다.\\n\\n>> Repeat\\nWould you mind repeating that?\\n다시 한 번 말씀해 주시겠어요?\\n\\nDo not repeat the mistakes of the past.\\n과거의 실수를 반복하지 마.\\n\\n>> Reiterate\\n마찬가지로 반복하다를 의미. 다만 행동보다는 '말'을 반복함을 의미. 무언가를 '강조하기 위해서' 반복할 때 사용.\\n\\nLet me reiterate a few more points already made.\\n이미 다뤄진 사항들 중에몇 가지 중요사항에 대해 한번 말씀드리죠.\\n\\n",
                "id": 180
            },
            {
                "title": "Accumulation",
                "description": "축적\\nAccumulate\\n\\nMuch like regular debt, sleep debt can accumulate.\\n보통 빚과 매우 비슷하게, 수면 빚은 축적될 수 있습니다.\\n\\nMinimizing memory accumulation and efficiently managing memory resources during program execution.\\n\\n프로그램이 실행되는 동안 메모리 누적을 최소화하고 메모리 리소스를 효율적으로 관리하는 것",
                "id": 110
            },
            {
                "title": "Asterisk",
                "description": "별표\\n*\\n애스-털-이스크",
                "id": 226
            },
            {
                "title": "incorporate",
                "description": "포함하다\\n인-코얼퍼-레잇\\n\\nThe new airplane design incorporates all the latest technology.\\n새로운 비행기 설계는 최신 기술 모두를 포함한다.\\n\\nIncorporating small amounts of exercise into your daily routine can reduce your risk of heart disease.\\n당신의 일과에 작은 양의 운동을 포함하는 것은 당신의 심장병 위험을 줄일 수 있다.\\n\\nNew mobile phone models incorporate many functions previously available only on personal computers.\\n새로운 휴대폰 모델에는 이전에는 개인용 컴퓨터에서만 사용할 수 있던 많은 기능들이 포함되어 있습니다.\\n\\nHer presentation incorporated last year's sales figures.\\n그녀는 프리젠테이션에 작년 매출액을 포함시켰습니다.\\n\\nPeople often feel more energetic after incorporating exercise into their routine.\\n사람들은 그들의 일상에 운동을 포함하고 나서 보통 더 활기를 느낀다.\\n\\n\\n",
                "id": 297
            },
            {
                "title": "Effectively ",
                "description": "효과적으로\\n어펙티블리\\n\\nOur team works together very effectively.\\n우리 팀은 팀웍이 매우 좋습니다.\\n\\nComputers help students study more effectively.\\n컴퓨터는 학생들이 효과적으로 공부할 수 있도록 도와줍니다.\\n\\nAbility to collaborate cross-functionally and effectively communicate with team members and stakeholders.",
                "id": 196
            },
            {
                "title": "Manipulate",
                "description": "조작하다.\\n\\nmanipulated\\nmanipulation\\n\\nhe manipulated the dials of the set\\n\\nthe masses were deceived and manipulated by a tiny group\\n\\nthe format allows fast picture manipulation\\n\\nthere was no deliberate manipulation of visitors' emotions",
                "id": 238
            },
            {
                "title": "Authorize",
                "description": "인가하다, 권한을 부여하다\\n\\nYou are not authorized to enter this room.\\n당신은 이 방에 들어갈 권한이 부여되지 않았다.\\n\\nThe bank has decided to authorize your loan.\\n은행에서 당신의 대출 신청을 인가하기로 결정했다.\\n\\nThis document must be authorized by the head of accounting by no later than Friday.\\n금요일까지 이 서류에 대한 회계 책임자의 승인을 받아야 한다.",
                "id": 173
            },
            {
                "title": "Aspect",
                "description": "측면, 양상\\n\\nThere were a few aspects of your essay that were particularly good.\\n당신의 에세이 중 특별히 좋았던 몇몇 측면들이 있었다.\\n\\nWe like most aspects of the design, but we've asked the architect to make some small changes.\\n우리는 그 설계의 대부분 측면을 좋아하지만 우리는 건축가에게 몇몇 작은 변화를 만들어달라고 요청했다.\\n\\nMaking connections is an important aspect of work.\\n인맥 구축은 일의 중요한 한 양상이다.",
                "id": 162
            },
            {
                "title": "Obtain",
                "description": "얻다\\n\\nWe obtained all of the necessary permits to build our house.\\n우리는 집을 짓는 데 필요한 모든 허가를 받았습니다.\\n\\nIt's easy to obtain information on the Internet very quickly.\\n인터넷에서 정보를 매우 빠르게 얻는 것은 쉬운 일입니다.\\n\\nHe obtained permission from his dad to borrow his car.\\n그는 아버지에게 차를 빌려가도 좋다는 허락을 받았습니다.",
                "id": 143
            },
            {
                "title": "Analytical",
                "description": "분석적인\\n에널-리티컬\\n\\nAnalyze\\n분석하다\\n에널-라이즈\\n\\nHis strong analytical skills make him valuable to the company.\\n우수한 분석 능력을 가진 그는 회사에 소중한 존재가 되었습니다.\\n\\nA research scientist needs strong analytical skills.\\n연구원은 분석 능력이 뛰어나야 합니다.\\n\\nExcellent problem-solving skills, attention to detail, and an analytical mindset.\\n\\nThis position requires both strong interpersonal and analytical skills.",
                "id": 167
            },
            {
                "title": "norm",
                "description": "표준, 일반적인 것\\n노올옴\\n\\nBusiness attire is the norm at our office, but some people dress more casually on Fridays.\\n우리 사무실은 비즈니스 정장 착용이 규정이지만 금요일에는 좀 더 편한 차림을 하기도 합니다.\\n\\nFamilies of three have become the norm.\\n3인 가족은 일반적인 것이 되었다.\\n\\nThe apartment building's design is a departure from the norm.",
                "id": 229
            },
            {
                "title": "Maintain",
                "description": "유지하다, 지속하다\\n\\nIt's important to maintain a good relationship with your clients.\\n당신의 고객들과 좋은 관계를 유지하는 것은 중요하다.\\n\\nYou should brush your teeth at least twice a day to maintain good oral health.\\n좋은 구강 건강을 유지하기 위해 당신은 하루에 적어도 두 번 당신의 치아를 닦아야 합니다.\\n\\nI try to maintain a relaxed attitude towards work.\\n나는 일에 대해서 느긋한 태도를 유지하려고 노력한다.\\n",
                "id": 119
            },
            {
                "title": "authentic",
                "description": "정통의, 진본인 , 진품인\\n어-쎈틱\\n\\nDeliver and receive feedback with an authentic interest in team and individual improvements.\\n팀과 개인의 개선에 대한 진정한 관심을 가지고 피드백을 전달하고 받습니다.\\n\\nThis restaurant serves authentic Mexican food.\\n이 식당은 정통 멕시칸 음식을 제공한다.\\n\\nShe wore an authentic Indian saree to the wedding.\\n그녀는 결혼식에 정통 인도를 입었다.",
                "id": 274
            },
            {
                "title": "Interpret",
                "description": "해석하다, 설명하다, 이해하다\\n인-털-프렛\\n\\ninterpretation\\n해석\\n인-털-프렛테이션\\n\\nFor the assignment, our teacher asked us to interpret the poem.\\n그 과제를 위해, 우리 선생님께서 그 시를 해석하도록 청하셨다.\\n\\nIt is very difficult to predict how the jury will interpret the evidence in this case.\\n배심원단이 사건에서의 증거를 어떻게 해석할지 예상하기가 몹시 어렵다.\\n\\nThe professor explained his interpretation of the poem.\\n교수는 시에 대한 그의 해석을 설명했다.\\n\\nAccording to a literal interpretation of the Bible, Jesus is the actual son of God.\\n성경의 기본 해석에 따르면, 예수는 실제로 신의 아들이다.\\n",
                "id": 152
            },
            {
                "title": "Occasionally",
                "description": "가끔\\n어케이션널리\\n\\nI occasionally play golf, but I'm not very good.\\n나는 가끔 골프를 치지만 잘 치지는 못합니다.\\n\\nI occasionally drink the alcohol-free version of Heineken so I don't get a hangover.\\n나는 숙취가 생기지 않게 하이네켄의 무알코올 버전을 가끔 마신다.",
                "id": 118
            },
            {
                "title": "Various",
                "description": "다양한\\n붸리우스\\n\\nHer face is painted in various colors.\\n그녀는 다양한 색으로 얼굴 화장을 했습니다.\\n\\nA flower experiences various stages of growth.\\n꽃은 다양한 생장 단계를 거칩니다.",
                "id": 204
            },
            {
                "title": "Concern",
                "description": "관심, 걱정, 우려\\n컨설언\\n\\nThank you for your concern.\\n걱정해줘서 고마워요.\\n\\nHis face is filled with concern.\\n그의 얼굴은 걱정으로 가득하다.\\n\\nI saw a look of concern on the doctor's face as she read through my test results.\\n그녀가 나의 검사 결과들을 꼼꼼히 읽으면서 나는 의사의 얼굴에 있는 우려의 표정을 보았다.\\n\\nSeveral teachers have expressed concerns about your son's behavior.\\n몇몇 선생님들이 귀하 아들의 행동에 관한 우려를 표현했습니다.\\n\\n",
                "id": 140
            },
            {
                "title": "Convince",
                "description": "확신시키다\\n\\nHe had a hard time convincing his boss that he was correct.\\n\\n그는 그의 상사에게 그가 옳았다는 것을 설득하는 데 힘든 시간을 보냈다.\\n\\nconvenient \\n편리한\\n\\nReact's hooks provide several convenient features that can be used in functional components.",
                "id": 81
            },
            {
                "title": "Engage",
                "description": "To Participate or Involve:\\n\\nExample: \\"She decided to engage in the discussion.\\"\\nTo Interact or Connect:\\n\\nExample: \\"The teacher tried to engage the students in the lesson.\\"\\n\\n관여시키다, 사로잡다, 끌어들이다\\n\\nThe speaker engaged the students and kept them interested.\\n그 발표자는 학생들을 사로잡았고 그들을 계속 관심 있게 했다.\\n\\nThe radio personality always engages listeners in an entertaining way.\\n그 라디오 유명인은 항상 재미있는 방법으로 청취자들을 사로잡는다.\\n\\nThe seminar didn't really engage her.\\n그 세미나는 사실 그녀를 사로잡지 못했다.\\n\\nThis movie should engage all types of audience.\\n이 영화는 모든 종류의 관중을 끌어들일 것이다.",
                "id": 158
            },
            {
                "title": "Enable",
                "description": "~을 할 수 있게 하다, 가능하게하다, 할 수 있게 하다.\\n\\nMy new job enables me to spend more time with my children.\\n나의 새로운 직장은 내가 아이들과 더 많은 시간을 보낼 수 있도록 하었다.\\n\\nThe new blood test enables doctors to detect the disease early.\\n\\nGraduating from university will enable her to get a good job.\\n대학을 졸업한 덕분에 그녀는 좋은 직장을 잡을 수 있을 것입니다.\\n\\nAn increase in my salary has enabled me to take a vacation abroad this year.\\n봉급이 인상되어 올해에는 해외 여행을 할 수 있게 되었습니다.",
                "id": 217
            },
            {
                "title": "Suffering",
                "description": "고통\\n\\nThe pain and suffering caused by the war was felt by every person in the country.\\n\\nPeople living with diabetes(당뇨병) often suffer from other health problems.\\n\\nThe condition of someone who suffers.",
                "id": 82
            },
            {
                "title": "Immerse",
                "description": "몰두하게 하다\\n\\nI was so immersed in my book that I didn't hear you come home.\\n나는 내 책에 너무 몰두하게 돼서 나는 당신이 집에 오는 것을 듣지 못했습니다.\\n\\nHe was so immersed in his work that he hardly noticed that everyone else had already left.\\n그는 그의 일에 정말 몰두해서 그는 다른 모두가 이미 떠났다는 것을 거의 의식하지 못했다.",
                "id": 166
            },
            {
                "title": "Standard",
                "description": "기준, 표준, 수준\\n\\nThis airline has very high safety standards.\\n이 항공사는 매우 높은 안전 기준들을 가지고 있다.\\n\\nWe have strict quality control standards to make sure all our products are safe for our customers.\\n우리는 우리의 제품 모두가 우리의 고객들에게 안전한 것을 확실히 하기 위해 엄격한 품질 관리 기준들이 있다.\\n\\n",
                "id": 133
            },
            {
                "title": "Oriented",
                "description": "성향, 방향\\nshowing the direction in which something is aimed\\n\\nHotels are a service-oriented industry.\\n\\nShe wants to turn the company into a profit-oriented organization.\\n",
                "id": 135
            },
            {
                "title": "emphasize",
                "description": "임-풰-사이즈\\n강조하다\\n\\nThe findings emphasized the importance of limiting screen time for kids aged 5 and under.\\n조사 결과들은 5세 미만의 아이들을 위한 스크린 시간을 제한하는 것의 중요성을 강조했다.\\n\\nThe teacher emphasized that he would fail any student who cheats on exams.\\n선생님은 시험에서 부정행위를 하는 그 어떤 학생이라도 불합격시킬 것이라고 강조했다.\\n\\nWhen I was growing up, my parents emphasized the importance of good manners.\\n내가 자랄 때 부모님께서 좋은 예의범절의 중요성을 강조하셨다.\\n\\nWe need to emphasize the quality of this product, not its low price.\\n우리는 이 제품의 저렴한 가격이 아닌 품질을 강조해야 한다.\\n\\n",
                "id": 301
            },
            {
                "title": "disqualify",
                "description": "자격을 박탈하다, 실격시키다\\n디스-퀄리-퐈이\\n\\ndisqualification\\n디스-퀄리-퓌-케이션\\n\\nShe was disqualified for a false start.\\n그녀는 부정 출발로 자격을 박탈당했다.\\n\\nNovak Djokovic was disqualified from the US Open after he accidentally hit a line judge with a ball.\\n노박 조코비치는 실수로 선심을 공으로 친 이후 미국 오픈에서 실격되었다.\\n\\nHe received a red card and was disqualified from playing in the next match.\\n그는 레드 카드를 받았고 다음 경기에 뛰는 것으로부터 자격을 박탈당했다.",
                "id": 246
            },
            {
                "title": "Approximately",
                "description": "약, ...정도\\n어프록-시-멧을리\\n\\nIn fact, approximately one in five Americans experience an episode in their lifetime.”\\n사실은, 미국인 다섯 명 중 한 명 정도는 그들의 일생에 한 번의 시기를 겪습니다,\\"라고 말한다.\\n\\nSince 1984, approximately 35 million people have died from HIV and AIDS-related diseases.\\n1984년 이후로, 약 3,500만 명의 사람이 HIV(에이즈 바이러스)와 에이즈 관련 질병으로 사망했다.\\n\\n",
                "id": 149
            },
            {
                "title": "Integrate",
                "description": "통합시키다, 완전하게 하다\\n\\n둘 이상의 것을 효과적으로 될 수 있게 하는 것으로, 주로 (부족한 부분을 추가하여) \\"완전한 것으로 하다\\" \\"완성하다\\" 라는 의미로 쓰인다.\\n\\nThese programs will integrate with your existing software.\\n\\n이들 프로그램은 당신이 기존에 가지고 있는 소프트웨어와 통합이 된다.\\n\\nThe company is planning to integrate management.\\n\\n그 회사는 경영을 통합할 계획 중이다.\\n\\nSeparation of both groups can make integration difficult.\\n\\n두 그룹이 분리되면 통합이 어려워질 수 있습니다.\\n\\n",
                "id": 85
            },
            {
                "title": "Critical",
                "description": "위기의, 아슬아슬한, 위험한\\n\\nFor example, she says, they practice critical thinking.\\n예를 들어, 그녀가 말하기를, 그들은 비판적 사고를 연습한다.\\n\\nDebating also strengthens critical thinking skills.\\n토론은 또한 비판적 사고법을 강화한다.\\n\\nSome are critical of the new guidelines.\\n일부는 새로운 지침서에 대해 비판적이다.\\n\\nIf the floodwaters do not recede within the next 48 hours, the situation could become critical.\\n홍수의 물이 다음 48시간 내로 약해지지 않는다면, 상황이 위험해질 수도 있다.\\n\\n-----------------\\n\\n결정적인, 1. 대단히 중요한[중대한] 2. 위태로운, 대단히 중요한[중대한], 1. 대단히 중요한[중대한]\\n\\nIt's critical that you finish this work by Friday.\\n이 업무를 금요일까지 끝내는 것은 대단히 중요하다.\\n\\nHighly motivated employees are critical to a company's success.\\n의욕적인 직원들은 한 기업이 성공하는 데 매우 중요하다.\\n\\nGetting this contract is critical to our success.\\n이 계약의 성사가 우리의 성공에 결정적입니다.",
                "id": 150
            },
            {
                "title": "sleep on",
                "description": "심사 숙고하다\\n\\nLet me sleep on it.\\n\\n좀더 생각해 볼게요.",
                "id": 90
            },
            {
                "title": "conclusion",
                "description": "결말, 결론\\n\\nThe two scientists formed different conclusions about the same data.\\n그 두 과학자는 똑같은 정보에 관해 다른 결론을 내렸다.\\n\\nOur conclusion is that we would very much like to work with you.\\n우리의 결론은 우리가 당신과 함께 일하고 싶다는 것입니다.\\n\\nWe haven't drawn conclusions about the challenges our company is facing.\\n우리는 우리 회사가 직면하고 있는 문제에 관해 결론을 내지 못했다.",
                "id": 231
            },
            {
                "title": "Enhance",
                "description": "향상시키다\\n인-헨스\\nenhancing\\nenhancements\\n\\nWe need to enhance our reputation in the market.\\n우리는 회사에 대한 시장 평판을 향상시킬 필요가 있습니다.\\n\\nSalt is usually used to enhance the taste of food.\\n소금은 주로 음식의 맛을 향상시키기 위해 사용된다.\\n\\nIndia has taken steps to enhance their military ties with Japan.\\n인도는 일본과의 군사 관계를 강화하기(향상시키기) 위한 단계를 밟았다.\\n\\nI joined an organization that is focused on furthering technology needed to enhance our environment.\\n나는 환경 개선에 필요한 기술 개발에 중점을 둔 조직에 합류했습니다.\\n\\n",
                "id": 84
            },
            {
                "title": "Insult",
                "description": "모욕, 욕\\n\\nHe screamed an insult at the referee.\\n그는 심판에게 욕을 소리쳤다.\\n\\nShe ignored the crowd's insults and continued her speech.\\n그녀는 군중의 모욕을 무시하고 그녀의 연설을 계속했다.\\n\\nI'm not going to take his insults any longer.\\n나는 더 이상 그의 모욕을 받아들이지 않을 것이다.",
                "id": 157
            },
            {
                "title": "Term",
                "description": "기간\\nGlobal warming takes place over the long term.\\n지구 온난화는 장기간에 걸쳐 진행됩니다.\\n\\nShe got good grades every term this year.\\n그녀는 올해 매 학기마다 좋은 학점을 받았습니다.\\n\\n용어, 말\\nThis word isn't used for the illness any more. We use another term.\\n이 단어는 더이상 그 질환에 사용되지 않는다. 우리는 다른 용어를 사용한다.\\n\\nThis article is difficult to understand because a lot of scientific terms are used.\\n많은 과학적인 용어들이 사용되었기 때문에 이 기사는 이해하기 어렵다.\\n\\nThe professor explained some of the most difficult terms on the board.\\n그 교수는 가장 어려운 몇몇 용어를 칠판으로 설명했다.",
                "id": 156
            },
            {
                "title": "Willingness",
                "description": "기꺼이 하려는 마음, 쾌히[자진하여] 하기, 기꺼이 하는 마음\\n\\nGood students have a willingness to learn in class.\\n좋은 학생은 학급 내에서 기꺼이 배우겠다는 마음을 가지고 있다.\\n\\nLearning English requires a willingness to study on one's own.\\n영어를 배우는 것은 혼자서 기꺼이 공부하겠다는 마음을 필요로 한다.\\n\\nHis willingness to listen to the concerns of employees at all levels has made him a popular CEO.\\n그는 직위 고하를 막론하고 모든 직원의 말에 귀를 기울이는 인기있는 CEO입니다.",
                "id": 139
            },
            {
                "title": "Throughout ",
                "description": "내내~\\n뜨로-아웃\\n\\nHe was widely known throughout his whole career.\\n그는 그의 경력 전반에 걸쳐 널리 알려졌다.\\n\\nThey continued arguing throughout the night.\\n그들은 밤새 싸우기를 계속했다.\\n\\nMost will be soon or throughout the summer.\\n대부분이 곧 또는 여름 동안에 공개될 것이다.",
                "id": 215
            },
            {
                "title": "Inclusive",
                "description": "포괄적인\\n\\nThey are looking at ways to make the industry more inclusive to women.\\n그들은 그 산업을 더 포괄적으로 만들 방식들을 살피고 있다.\\n\\nAfter decades of being male-dominated, the gaming industry is becoming more inclusive.\\n몇십 년 남성 우위인 이후로, 게임 산업은 더 포괄적으로 되고 있다.",
                "id": 187
            },
            {
                "title": "attire",
                "description": "정장, 의복\\n어-타이얼\\n\\nBusiness attire is the norm at our office, but some people dress more casually on Fridays.\\n우리 사무실은 비즈니스 정장 착용이 규정이지만 금요일에는 좀 더 편한 차림을 하기도 합니다.\\n\\nThe shop sells formal attire for men.\\n이 상점은 남성 정장을 판매합니다.\\n\\nWe were required to wear formal attire for the reception at the museum.\\n우리는 박물관에서의 리셉션을 위해 정장 차림으로 참석하도록 요구받았다.",
                "id": 228
            },
            {
                "title": "Distinguish",
                "description": "구별하다\\ndistinguishing\\n\\nMy son still cannot distinguish fantasy from reality.\\n나의 아들은 여전히 환상과 현실을 구별할 수 없다.\\n\\nIt's hard to distinguish one shopping mall from another.\\n쇼핑몰끼리 구별하는 것은 어렵다.\\n\\nThe twins are impossible to distinguish.\\n그 쌍둥이를 구별하는 것은 불가능합니다.",
                "id": 213
            },
            {
                "title": "scope",
                "description": "범위\\n\\nThe blueprints give a good idea of the scope of the project.\\n\\nConstruction will take at least a year, depending on the design and scope of the project.\\n\\nThis chart illustrates the scope of this business opportunity.\\n\\nThe scope of the project has recently increased.\\n최근에 프로젝트 범위가 확대되었습니다.",
                "id": 254
            },
            {
                "title": "Interact",
                "description": "상호작용하다,\\n소통하다, 교류하다\\n\\nI interact with my manager on a regular basis.\\n나는 내 매니저와 정기적으로 소통한다.\\n\\nI've met the director, but I don't interact with her very often.\\n나는 책임자를 만나봤지만, 그녀와 그렇게 자주 교류하지 않는다.\\n\\nHe always interacts with the audience during his shows.\\n그는 그의 공연들 중에 관중들과 항상 소통한다.\\n\\nThe cafeteria is a good place for employees to relax and interact.\\n구내식당은 직원들이 쉬고 소통하기 좋은 장소이다.",
                "id": 164
            },
            {
                "title": "Consultant",
                "description": "개인, 기업, 단체 등에 필요한 조언을 해주는 전문가.\\n\\nsomeone who advises people on a particular subject\\n\\na management/financial/computer consultant\\na firm of public relations consultants\\n\\nConsulting\\n컨설팅(Consulting)이란 어떤 분야에 전문적인 지식을 가진 사람이 의뢰를 한 고객을 상대로 상세하게 상담하고 도와주는 것.",
                "id": 161
            },
            {
                "title": "Policy",
                "description": "정책\\n폴리시\\nPolicies\\n\\nOur shop's policy is \\"Customers always come first.\\"\\n우리 가게의 정책은 \\"고객이 항상 먼저 온다\\"이다.\\n\\nThe Irish government announced a policy to ban the sale of new petrol and diesel cars by 2030.\\n아일랜드 정부는 2030년까지 새로운 휘발유와 경유 자동차들의 판매를 금지할 정책을 발표했다.",
                "id": 132
            },
            {
                "title": "Surge",
                "description": "급등, 급증, 서지, 치밀어 오름\\n\\nThe past decade has seen a massive surge in the use of online dating apps.\\n\\n지난 10년은 온라인 데이팅 앱들의 사용에서의 엄청난 급등을 봤다.\\n\\nA surge in traffic led to server overload.\\nThe server experienced overload due to a surge in traffic.\\nThe server became overloaded as a result of a traffic surge.\\n",
                "id": 96
            },
            {
                "title": "criteria",
                "description": "크라이-테리아\\n\\n기준\\n\\nIce skating judges have to consider a wide range of criteria when giving out scores.\\n아이스 스케이팅 심사위원들은 점수들을 나눠 주기 전에 넓은 범위의 기준을 고려해야 한다.\\n\\nI'm pleased to see that you meet all of the criteria for this position.\\n귀하가 직위에 맞는 모든 기준을 충족시키는 것을 보니 기쁩니다.\\n\\nThough we have several criteria for selecting a site for the new cafe, the most important is that it be in a high-traffic area.\\n우리가 새로운 카페의 부지를 선정하기 위한 여러 기준이 있긴 했지만, 가장 중요한 것은 그곳이 통행량이 많은 지역에 있어야 한다는 것이다.\\n\\n",
                "id": 300
            },
            {
                "title": "Significant",
                "description": "상당한, 중요한\\n시그-니피-켄트\\n\\nWe've made significant progress on the project over the last few days.\\n지난 며칠간 우리는 프로젝트에서 상당한 진전을 만들었다.\\n\\nServer maintenance is a significant expense for us.\\n서버 유지는 우리에게 상당한 비용이다.",
                "id": 127
            },
            {
                "title": "Remain",
                "description": "계속 ~이다, 남다\\n\\nHe remained at the bar until it closed.\\n그는 술집에 그곳이 문을 닫을 때까지 남아 있었다.\\n\\nA few people remained in their seats after the movie ended.\\n영화가 끝난 후 몇몇 사람들이 그들의 자리에 남아 있었다.\\n\\nShe remained silent during the discussion.\\n그녀는 토론 중에 계속 조용히 있었다.\\n\\nAfter winning the 1991 season, the Chicago Bulls remained dominant throughout the '90s.\\n1991년 시즌을 우승한 뒤, 시카고 불스는 90년대 내내 계속 우세했다.\\n\\nNorth Korea has remained in almost total isolation since the end of the Korean War.\\n북한은 한국 전쟁의 종료 이후로 계속 거의 완전히 고립되어 있다.",
                "id": 185
            },
            {
                "title": "distinct",
                "description": "뚜렷한, 분명한, 뚜렷이 다른[구별되는]\\n디스-팅-트\\n\\ndistinguish - 구별하다, 구분하\\ndistinctly - 확실히 알수 있을 정도로, 확연히\\ndistinction - 차이, 차이점, 구분, 탁월함, 우수한 평가\\n\\nThis hotel has a very distinct design.\\n이 호텔의 디자인은 뚜렷하게 구분됩니다.\\n\\nThere is a distinct difference between traditional and modern buildings.\\n전통식 건물과 현대식 건물 사이에 뚜렷한 차이가 있다.\\n\\nShe has a very distinct style of speaking.\\n그녀는 굉장히 구별되는 화법을 가지고 있다.\\n\\nEverybody noticed a distinct difference between what he said earlier and what he's saying now.\\n모두가 그가 전에 말한 것과 그가 지금 말하는 것 사이에 뚜렷이 다른 차이점을 알아냈다.\\n\\nEach snowflake is unique and has its own distinct pattern of ice crystals.\\n눈송이 각각은 유일무이하고 그것만의 별개의 빙정들의 무늬가 있다.",
                "id": 261
            },
            {
                "title": "conservative",
                "description": "보수적인\\n\\nThat is why I'm conservative too! \\n\\nFox News is the most-watched conservative news channel in the United States.\\n폭스 뉴스는 미국에서 가장 많이 시청되는 보수적인 뉴스 채널이다.\\n\\nSaudi Arabia is one of the most socially conservative countries in the world.\\n사우디아라비아는 세계에서 가장 사회적으로 보수적인 나라들 중 한 곳이다.",
                "id": 270
            },
            {
                "title": "alternative",
                "description": "대안의, 대체의, 다른\\n어얼-털네디브\\n\\nWe need an alternative way to drive home.\\n우리는 집으로 운전할 다른 길이 필요하다.\\n\\nPeople are starting to use alternative sources of energy.\\n사람들이 대체 에너지원을 사용하기 시작하고 있다.\\n\\nThe army is considering an alternative route for the oil pipeline.\\n그 군대는 송유관을 위한 대체 경로를 고려하고 있다.",
                "id": 241
            },
            {
                "title": "Contribute",
                "description": "기부하다, 기여하다, 이바지하다\\n\\nShe contributed to the success of the project.\\n그녀는 프로젝트의 성공에 이바지했다.\\n\\nShe contributes money to many organizations.\\n그녀는 많은 단체에 돈을 기부한다.",
                "id": 172
            },
            {
                "title": "Organization",
                "description": "조직, 단체\\n\\nOur organization has offices all over the world.\\n우리 조직은 전 세계에 사무소를 두고 있습니다.\\n\\nI joined an organization that is focused on furthering technology needed to enhance our environment.\\n나는 환경 개선에 필요한 기술 개발에 중점을 둔 조직에 합류했습니다.\\n\\nUNESCO is a global organization.\\n유네스코는 국제 조직입니다.",
                "id": 147
            },
            {
                "title": "colleague",
                "description": "같은 직장이나 직종에 종사하는 동료\\n(부서는 다르지만 A라는 회사와 함께 다니고 있으면 colleague라고 할 수 있다.)\\n칼리-그_스\\n\\ncoworker - 함께 일하는 사람, 협력자, 동료\\n(함께 일하는 사람, 협력자 등 같은 회사의 같은 부서에서 함께 일하는 사람을 말한다.)\\n\\nI get on very well with most of my colleagues.\\n나는 내 동료들 중 대부분과 아주 잘 지낸다.\\n\\nMy colleague and I got into an argument.\\n나의 동료와 나는 논쟁을 했다.\\n\\nShe likes working with her colleagues.\\n그녀는 그녀의 동료들과 일하는 것을 좋아한다.",
                "id": 225
            },
            {
                "title": "Traits",
                "description": "특성, 특징\\n\\nShyness is a common personality trait among young children.\\n수줍음은 많은 어린아이 사이의 흔한 성격 특성이다.\\n\\nThis frog's most distinguishing trait is the color of its skin.\\n이 개구리의 가장 눈에 띄는 특성은 그것의 피부색이다.\\n\\nCuriosity and empathy are coveted traits here!",
                "id": 211
            },
            {
                "title": "Stakeholder",
                "description": "스테이크홀더(Stakeholder)는 어떤 조직 또는 프로젝트와 관련된 이해관계자 또는 이해당사자를 가리키는 용어입니다.\\n\\n스테이크홀더는 해당 조직 또는 프로젝트의 결과물 또는 결정에 영향을 미칠 수 있는 개인, 그룹, 단체, 혹은 기관을 포함합니다.\\n\\n이해관계자들은 프로젝트 또는 조직의 성공에 관심을 가지며, 그들의 요구사항과 기대를 고려해야 합니다.\\n\\n1. 내부/외부 스테이크홀더\\n2. 요구사항 및 기대 관리\\n3. 의사결정 영향력\\n4. 프로젝트 성과 감시\\n\\n스테이크홀더 관리는 프로젝트 관리와 조직 경영에서 중요한 요소 중 하나이며, 스테이크홀더의 의견과 요구사항을 고려하여 프로젝트 또는 조직을 효과적으로 관리하는 데 도움을 줍니다.",
                "id": 148
            },
            {
                "title": "involve",
                "description": "수반하다, 관련되다, 포함하다, 참여시키다\\n\\nI was involved in the filming of the short film.\\n\\nThank you for involving me in this important project.\\n저를 이 중요한 프로젝트에 참여시켜 주셔서 감사합니다.\\n\\nHaving a healthy lifestyle involves exercise and eating healthy.\\n건강한 생활 습관은 운동과 건강한 식습관을 필요하다.\\n\\nMy job involves analyzing financial data.\\n내 업무는 재무 자료를 분석하는 것을 포함한다.\\n\\nPolice are trying to identify two men believed to be involved in the robbery.\\n경찰은 그 강도 사건에 연루되었다고 여겨지는 두 남성의 신분을 밝히려고 노력하고 있다.",
                "id": 290
            },
            {
                "title": "capable",
                "description": "capable \\n유능한, 할 수 있는\\n케입-어블\\n\\ncapability\\n능력, 가능성, 뻗어날 소질\\n케입-어블리티\\n\\nAll the employees at my company are very capable.\\n우리 회사의 모든 직원들은 아주 유능하다.\\n\\nMost people are capable of much more than they imagine.\\n대부분 사람들은 그들이 생각하는것보다 훨씬 더 유능하다.\\n\\nWe believe you are capable of taking care of this problem on your own.\\n우리는 당신이 이 문제를 혼자서 해결할 수 있다고 생각한다.\\n\\nShe is a very capable doctor.\\n그녀는 매우 유능한 의사이다.",
                "id": 232
            },
            {
                "title": "departure ",
                "description": "출발\\n디-팔-튜얼\\n\\nI want to get to the airport at least one and a half hours before the departure time.\\n나는 공항에 적어도 출발 시간 한 시간 반 전에는 도착하고 싶다.\\n\\nThis schedule shows all the international departures.\\n이 일정은 모든 국제선 출발을 보여준다.\\n\\nYour departure time is 12:10.\\n출발 시간은 12시 10분입니다.\\n\\nYou should be at the airport two hours before your flight's departure.\\n당신은 당신의 항공편 출발 2시간 전에 공항에 있어야한다.",
                "id": 230
            },
            {
                "title": "Precise",
                "description": "정밀한, 정확한\\n프레-사이스\\n\\nMy boss is very precise when giving instructions.\\n나의 상사는 지시를 내릴 때 굉장히 정확하다.\\n\\nWe need precise information before we believe the news we have just heard.\\n방금 들은 뉴스를 믿으려면 먼저 정확한 정보가 필요하다.\\n\\nHe's taking a precise measurement.\\n그는 정확한 측정을 하고 있다.",
                "id": 159
            },
            {
                "title": "Diversity",
                "description": "다양성\\n디-벌시티\\n\\nOur company is committed to promoting racial diversity.\\n우리 회사는 인종적 다양성을 증진하는 데 전념한다.\\n\\nThe school is characterized by the diversity of its students.\\n그 학교는 그곳 학생들의 다양성으로 특징된다.\\n\\nIncreasing diversity in the workplace is an important issue for many employers.\\n직장에서 다양성을 높이는 것은 많은 고용주에게 중요한 문제이다.\\n\\n-------------\\n\\nDiverse\\n다양한\\n다이-벌스\\n\\nWe live in a diverse society.\\n우리는 다양한 사회에 살고 있다.\\n\\nAmerica has a diverse population of people from around the world.\\n미국은 전 세계에서 온 다양한 인구가 있다.",
                "id": 169
            },
            {
                "title": "Authentication",
                "description": "Authentication \\n사용, 입장 인증\\n어쎈티케이션\\n\\nAuthorization\\n권한, 인증\\n어쏘리제이션\\n\\nauthentication 과 authorization의 차이\\n\\nauthentication은 로그인하는 절차.\\n패스워드라하면 입장인증에 사용되는 암호를 의미합니다.\\n로그인을 성공하면 그 사람은 authenticator 가 된다.\\n\\nauthorization은 로그인 후 그 사람이 관리자냐 일반사용자냐 슈퍼유저나 특정개인이냐를 구분하는 절차.\\n인증번호라하면 권한인증에 사용되는 암호를 의미합니다.\\n\\n로그IN은 아이디 비밀번호를 아는 사람은 누구나 들어갈 수 있다. 즉 어쎈티케이션\\n로그ON은 아이디 비밀번호를 아는 사람이 특정인이라고 간주한다. 즉 오쏘리제이션",
                "id": 194
            },
            {
                "title": "Approach",
                "description": "접근하다, 다가가다, 가까워지다\\n\\nHe approached the old lady to ask if she needed any help.\\n그는 늙은 여성에게 다가가 그녀가 도움이 필요한지 물었다.\\n\\nAs the deadline approached, everyone in the office changed gear and worked faster.\\n마감일이 가까워지면서, 사무실에 있는 모두가 속도를 가해서 더 빨리 일했다.\\n\\nIf you come across a snake, do not approach it and slowly back away to a safe distance.\\n만약 당신이 뱀을 우연히 발견하면, 그것에게 다가가지 말고 안전한 거리로 천천히 뒷걸음질 치세요.\\n\\n",
                "id": 155
            },
            {
                "title": "Bias",
                "description": "편견, 편향, 선입견\\n바이에스\\n\\nYou enjoy getting things done and have a bias for action.\\n당신은 일을 완수하는 것을 좋아하고 행동에 대한 편견을 가지고 있습니다.\\n\\nIt's important that everyone is treated equally and without bias.\\n모두가 동등하고 편견 없이 대우받는다는 것이 중요하다.\\n\\nTeachers should evaluate their students without bias.\\n선생님들은 그들의 학생들을 편견 없이 평가해야 한다.\\n\\nShowing bias means favoring one side over another.\\n선입견을 보이는 것은 한쪽을 다른 한쪽보다 편애한다는 것을 의미한다.",
                "id": 207
            },
            {
                "title": "Confine",
                "description": "넣다[가두다], 한정하다, 제한하다 2. 구금[감금]하다\\n\\nThe firefighters fought to confine the fire.\\n소방관들은 화재를 국한시키기 위해 분투했다.\\n\\nThey were confined to their cell together.\\n그들은 그들의 감방에 함께 가둬졌다.",
                "id": 198
            },
            {
                "title": "segment",
                "description": "부분\\n\\nWe control a large segment of the market.\\n우리는 시장의 많은 부분을 지배하고 있습니다.\\n\\nOur company considers housewives a distinct market segment.\\n우리 회사는 주부층을 중요한 세분 시장으로 간주합니다.",
                "id": 260
            },
            {
                "title": "terminate",
                "description": "종료하다\\n\\nMy project has been terminated.\\n내 프로젝트가 중단되었습니다.\\n\\nOne of the hardest tasks is to terminate the employment of a worker.\\n가장 어려운 업무 중 하나는 직원을 해고하는 것입니다.\\n\\nWe've decided to terminate the contract.\\n우리는 계약을 종료하기로 결정했습니다.\\n\\nThe contract can only be terminated with the agreement of both of the parties.\\n이 계약은 양 당사자의 합의가 있어야 해지 가능합니다.\\n\\n",
                "id": 298
            },
            {
                "title": "Harsh",
                "description": "가혹한, 엄한, 거친\\n\\nThe comedian faced harsh criticism over several offensive tweets.\\n그는 몇몇 불쾌한 트윗들에 대해 거난 비난을 직면했다.",
                "id": 77
            },
            {
                "title": "equivalent",
                "description": "동등한, 맞먹는\\n이쿼이-뷀렌트\\n\\nHis monthly salary is equivalent to what some people earn in a whole year.\\n그의 월급은 몇몇 사람들이 일 년에 버는 것과 맞먹는다.\\n\\nThe salary I am making here is roughly equivalent to what I made in my previous job.\\n내가 이곳에서 버는 연봉은 나의 이전 직장에서 번 것과 대략 맞먹는다.\\n\\nThe suspect's illegal flight from the country was equivalent to admitting his guilt.\\n그 용의자의 그 나라로부터의 불법 도피는 그의 유죄를 인정하는 것과 동등했다.",
                "id": 221
            },
            {
                "title": "interpersonal",
                "description": "대인관계\\n\\nTo be successful, a shop owner must have excellent interpersonal skills.\\n가게 주인의 대인 관계 기술이 뛰어나야 성공할 수 있습니다.\\n\\nIt is unpleasant to work in an office where interpersonal relationships break down.\\n직원들 사이의 관계가 좋지 않은 사무실에서 일하기란 불편한 일입니다.",
                "id": 255
            },
            {
                "title": "Corporate",
                "description": "기업, 회사\\nrelating to a corporation, especially a large company or group.\\n\\"airlines are very keen on their corporate identity\\"\\n\\nBBC stands for British Broadcasting Corporation.\\nBBC는 영국 방송 회사를 의미한다.\\n\\nJamal is the head of a big corporation.\\n자말은 큰 회사의 책임자이다.\\n\\nOur multinational corporation has offices all over the world.\\n우리 다국적 기업은 전세계에 지사를 두고 있다.\\n\\nThat corporation owns a food processing company and a chain of restaurants as well.\\n그 회사는 식품 가공회사와 레스토랑 체인점도 소유하고 있다.",
                "id": 184
            },
            {
                "title": "Coordinate",
                "description": "조정하다, 조직화[편성]하다, 조율하다\\n쿠얼디-네\\n\\nI need you to coordinate tomorrow's schedule.\\n내일 일정을 조정해야 합니다.\\n\\nHer job is to coordinate everybody's different tasks.\\n그녀의 일은 직원들의 다양한 업무를 조율하는 것입니다.\\n\\nRussia and Turkey are taking steps to coordinate their military actions in Syria.\\n러시아와 터키는 시리아에서 그들의 군사 행동을 조직화하기 위해 조치를 취하고 있다.\\n\\nThe dance was coordinated by Lizzie.\\n그 춤은 Lizzie에 의해 편성되었다.\\n\\nThe army and the police will coordinate their efforts to put a stop to the violence.\\n군대와 경찰은 폭력을 멈추기 위해 그들의 노력을 조직화할 것이다.",
                "id": 175
            },
            {
                "title": "Constructive",
                "description": "건설적인\\n\\nIf advice, criticism, or actions are constructive, they are useful and intended to help or improve something:\\n\\nThoughtful and constructive code reviewer capabilities.\\n\\nShe criticized my writing, but in a way that was very constructive.\\n\\nIf you don't have anything constructive to say, it's better to say nothing.\\n\\nConstruction is planned to begin in 2022.\\n건설은 2022년에 시작될 것으로 계획됐다.",
                "id": 218
            },
            {
                "title": "Utility",
                "description": "유용성\\n\\n사용자가 원하는 것을 제공하는가\\n\\n유용성이 결여된 경우,\\n사용자가 원하지 않는 것을 편하고 즐겁게 제공한다.",
                "id": 205
            },
            {
                "title": "Instance",
                "description": "경우, 사례\\n인스튼스\\n\\nIn this instance, the <App/> component is being rendered to the <div id=\\"root\\"></div> element on the page.\\n\\nThis is not the first instance of your making this mistake.\\n당신이 이런 실수를 저지른 첫 사례가 아닙니다.\\n\\nThere have been several instances of theft in the neighborhood this year.\\n올해 동네에서 몇 번의 도난 사례가 있었다.\\n\\nIn some instances, the virus can be deadly.\\n어떤 경우에 그 바이러스는 치명적일 수 있다.\\n\\nThere have been several instances of people slipping in this water.\\n사람들이 이 물에 미끄러지는 몇 번의 경우들이 있었다.\\n",
                "id": 235
            },
            {
                "title": "dedicated",
                "description": "헌식적인, 일신을 바친\\n\\nBut, the experts also praised the 15-year-old for his dedication to his research.\\n그러나, 그 전문가들은 그 15세 소년의 연구에 대한 전념을 칭찬했다.\\n\\nWith love and with my entire heart and soul, I dedicate this award to the people of my country.”\\n사랑과 온 마음과 영혼으로 나는 이 상을 내 나라 사람들에게 바친다.\\"\\n\\nGankhuyag Natsag, also known as Ganna, has dedicated his life to sharing Mongolian culture around the world through his art.\\n가나(Ganna)로도 알려진 간호약 나차그(Gankhuyag Natsag)는 그의 예술을 통해 전 세계에 몽골 문화를 공유하는 데 그의 삶을 바쳤다.\\n\\n",
                "id": 248
            },
            {
                "title": "discover",
                "description": "발견하다\\n\\nShe discovered that her husband has a secret lover.\\n그녀는 그녀의 남편에게 비밀 애인이 있다는 것을 발견했다.\\n\\nThe scientist discovered a new drug.\\n그 과학자는 새로운 약물을 발견했다.\\n\\nShe discovered at a young age that she was good at sports.\\n그녀는 어렸을 때부터 운동에 재능이 있다는 것을 발견했다.",
                "id": 251
            },
            {
                "title": "Interrupt",
                "description": "방해하다, 중단시키다\\n\\nChris always interrupts people during meetings.\\n크리스는 회의 동안 사람들을 항상 방해한다.\\n\\nMy thoughts were interrupted by someone knocking on the front door.\\n나의 생각들은 누군가가 앞문을 두드리는 것으로 방해되었다.\\n\\nHe couldn't hide his annoyance after Lucy interrupted him for the third time.\\n그는 루시가 그를 세 번째로 방해한 이후로 그의 짜증을 숨길 수 없었다.",
                "id": 153
            },
            {
                "title": "qualify",
                "description": "자격을 얻다\\n\\nThe course will qualify them to use computers in their jobs.\\n이 과정을 이수하면 업무에 컴퓨터를 사용할 수 있습니다.\\n\\nIn order to qualify as firefighters, they must pass strict physical tests.\\n소방관으로서 자격을 갖추려면 엄격한 신체 검사를 통과해야 합니다.\\n\\nThey hope to qualify as chefs at the end of their training.\\n그들은 교육을 마치고 요리사 자격을 얻을 수 있기를 희망합니다.",
                "id": 249
            },
            {
                "title": "especially",
                "description": "특히, 특별히\\n에스-페셜리\\n\\nI like all sweets, but I especially love chocolate.\\n나는 모든 단것을 좋아하지만, 나는 특히 초콜릿을 좋아한다.\\n\\nMy boyfriend is especially useful when I go shopping.\\n나의 남자친구는 내가 쇼핑하러 갈 때 특히 도움이 된다.\\n\\nI especially liked the sauce.\\n나는 특히 그 소스를 좋아했다.",
                "id": 188
            },
            {
                "title": "specify",
                "description": "명시하다\\n\\nspecifies\\n지정하다\\n스페시파이스\\n\\nCertain details are not specified clearly enough in this report.\\n일부 세부 정보가 이 보고서에 명시되어 있지 않습니다.\\n\\nAll the pricing details are specified in the contract.\\n모든 세부적인 가격 정보는 계약서에 명시되어 있습니다.\\n\\nBefore we can make a time estimate, we need to specify the scope of the project.\\n\\nIt specifies how an element should fit within its container.",
                "id": 253
            },
            {
                "title": "authority",
                "description": "권한\\n\\nShe has the authority to make important decisions in the office.\\n그녀에게는 사무실에서 중요한 결정을 내릴 수 있는 권한이 있습니다.\\n\\nNew coaches often feel the need to demonstrate their authority.\\n새로운 코치는 종종 자신의 권위를 보여줄 필요성을 느낍니다.\\n\\nIf you underplay your authority, employees eventually will turn against you.\\n권한을 소극적으로 행사하면 결국 직원이 반발하게 됩니다.\\n\\nThe group leader has the authority to make any necessary changes.\\n그룹 리더에게는 필요한 변경을 할 권한이 있습니다.\\n\\n",
                "id": 273
            },
            {
                "title": "Eligible",
                "description": "자격이 있는\\n일러지블\\n\\nI will be eligible for retirement next year.\\n나는 내년에 정년퇴직 자격이 있을 것이다.\\n\\nI interviewed three applicants sent by the company, and none of them are eligible for the job.\\n나는 회사에서 보낸 3명의 지원자를 면접했지만, 그들 중 누구도 그 일자리에 적격이지 않았다.",
                "id": 116
            },
            {
                "title": "Workplace",
                "description": "직장\\n\\nTelecommunications technologies have allowed many freelancers to use the home as their workplace.\\n정보통신기술 덕분에 프리랜서의 재택근무가 가능하게 되었습니다.\\n\\nSmoking is not allowed in the workplace.\\n직장에서는 금연입니다.\\n\\nI work in a very relaxed workplace.\\n나는 매우 편안한 직장에서 일하고 있습니다.",
                "id": 170
            },
            {
                "title": "Thrive",
                "description": "번창하다, 잘 자라다\\n트라이브\\n\\nWe were driving through a thriving city.\\n우리는 번창하고 있는 도시를 지나 운전하고 있었다.\\n\\nOlive trees require regular watering to thrive.\\n올리브 나무는 잘 자라기 위해서 정기적인 살수를 필요로한다.\\n\\nWorms thrive in warm and wet weather.\\n지렁이는 따뜻하고 습한 날씨에서 잘 자란다.\\n\\nThrive in a fast-paced agile environment founded on strong analytical and communication skills.\\n",
                "id": 197
            },
            {
                "title": "Ensure",
                "description": "Ensure 보장하다\\nAssure 장담하다 확언하다\\nInsure 보호하다 보험들다\\n\\nEating a balanced diet can help ensure you get the necessary vitamins for good health.\\n건강한 식단을 먹는 것은 당신이 좋은 건강을 위한 필요한 비타민들을 얻는 것을 확실히 하는 데 도움이 될 수 있다.\\n\\nWe have to ensure that this kind of accident will not happen again.\\n우리는 이런 종류의 사고가 다시 일어나지 않도록 보장해야 한다.\\n",
                "id": 145
            },
            {
                "title": "Participate",
                "description": "Participate\\n참가하다, 참여하다\\n팔-티십-페잇\\n\\nWould you like to participate in our discussion?\\n당신은 우리의 토론에 참여하시겠습니까?\\n\\nI love participating in festivals when I travel abroad.\\n나는 해외에 여행할 때 축제에 참여하는 것을 좋아한다.\\n\\nShe is not participating in the conversation.\\n그녀는 대화에 참여하지 않고 있다.\\n\\n--------------------------\\n\\nParticipation\\n참가, 참여\\n\\nParticipation in this survey is voluntary.\\n이 설문조사의 참여는 선택사항이다.\\n\\nParticipation at this year's charity run was much higher than expected.\\n올해의 자선 달리기에서 참여는 기대보다 훨씬 높았다.\\n\\nYour participation would be greatly appreciated.\\n당신의 참여는 굉장히 도움이 될 것이다.",
                "id": 168
            },
            {
                "title": "Mock",
                "description": "모조품\\n머크\\n\\n실제 객체를 만들기엔 비용과 시간이 많이 들거나 의존성이 길게 걸쳐져 있어 제대로 구현하기 어려울 경우, 가짜 객체를 만들어 사용하는데 이것을 Mock이라 합니다.\\n\\n테스트 작성을 위한 환경 구축이 어려운 경우\\n환경 구축을 위한 작업 시간이 많이 필요할 때 Mock객체를 사용합니다. (데이터베이스, 웹서버, FTP서버 등)\\n아직 개발되지 않은 모듈을 사용하는 테스트가 필요할 때 사용합니다.\\n테스트가 특정 경우나 순간에 의존적인 경우\\n테스트 시간이 오래 걸리는 경우\\n\\n1. 테스트 더블\\n테스트를 진행하기 어려운 경우 이를 대신해 테스트를 진행할 수 있도록 만들어주는 객체를 말합니다. Mock객체와 유사한 의미를 가지며 테스트 더블이 상위 의미로 사용됩니다.\\n\\n2. 더미 객체\\n단순히 인스턴스화 될 수 있는 수준으로만 객체를 구현합니다. 객체의 기능은 사용하지 않고 객체 자체로만 테스트를 진행할 수 있을 때 사용합니다.\\n\\n3. 테스트 스텁\\n더미 객체보다 좀 더 구현된 객체로 더미 객체가 실제로 동작하는 것처럼 보이게 만든 객체입니다. 객체의 특정 상태를 가정해서 만들어 특정 값을 리턴하거나 특정 메시지를 출력하는 작업을 합니다.\\n\\n4. 페이크 객체\\n여러 상태를 대표할 수 있도록 구현된 객체로 실제 로직이 구현된 것처럼 보이게 합니다. 페이크 객체를 만드는 복잡도로 인해서 시간이 많이 걸릴 경우 적절한 수준에서 구현하거나, Mock 프레임 워크를 사용합니다.\\n\\n5. 테스트 스파이\\n테스트에 사용되는 객체, 메소드의 사용 여부 및 정상 호출 여부를 기록하고 요청 시 알려줍니다. 특정 메소드가 호출되었을 때 또 다른 메서드가 실행이 되어야 한다와 같은 행위 기반 테스트가 필요한 경우 사용합니다. 테스트 스파이는 특수한 경우를 제외하고는 잘 쓰이지 않으며 보통 Mock 프레임워크에서 기본적으로 기능을 제공합니다.\\n\\n6. Mock 객체\\n행위를 검증하기 위해 사용되는 객체를 지칭하며 수동으로 만들 수도 있고 프레임워크를 통해 만들 수 있습니다. 행위 기반 테스트는 복잡도나 정확성 등 작성하기 어려운 부분이 많기 때문에 상태 기반 테스트가 가능하다면 만들지 않는 게 좋습니다.",
                "id": 245
            },
            {
                "title": "Embrace",
                "description": "받아들이다, 수용하다\\n엠-브레이스\\n\\nYoung people are usually quick to embrace new technology.\\n젊은 사람들은 보통 새로운 기술을 받아들이는 데 빠르다.",
                "id": 275
            },
            {
                "title": "Procedure",
                "description": "절차\\n\\nDrug testing is a standard procedure in this company.\\n이 회사에서 약물 검사는 정식 절차이다.\\n\\nFour times a year, our company practices fire evacuation procedures.\\n일 년에 네 번, 우리 회사는 화재 대피 절차를 연습한다.\\n\\nOur department implemented new procedures to save time and cut costs.\\n우리 부서는 시간을 아끼고 비용을 절감하기 위해 새 절차들을 시행했다.",
                "id": 114
            },
            {
                "title": "Assault",
                "description": "폭행, 폭행죄, 공격\\n어설트\\n\\nassaulting\\n\\nThe actor's assault on the director made headlines around the world.\\n배우의 감독 폭행은 세계 곳곳에서 대대적으로 보도됐다.\\n\\nTom was charged with assault after getting into a fight at the bar. \\n톰은 술집에서 싸우게 된 이후로 폭행으로 기소되었다.\\n\\nHe was charged with assault for punching a police officer.\\n그는 경찰관을 주먹으로 때린 것으로 폭행으로 기소되었다.\\n\\nAfterwards several of the gang members were arrested for assault.\\n그 뒤에 범죄 조직 일원들의 몇몇이 폭행죄로 체포되었다.",
                "id": 201
            },
            {
                "title": "Proven",
                "description": "입증된\\n\\nThat is not scientifically proven.\\n이는 과학적으로 입증되지 않았다.\\n\\nThey found that none of the reported health benefits could be proven.\\n그들은 보고된 건강상 이익 중 어는 것도 증명될 수 없다는 것을 발견했다.\\n\\nYou have proven yourself to be...",
                "id": 137
            },
            {
                "title": "Abort",
                "description": "1) 중단 2) 낙퇴, 유산\\n\\nto cause something to stop or fail before it begins or before it is complete\\n\\nabortion\\n낙퇴 유산\\n\\nThe rescue mission was quickly aborted because of poor weather conditions.\\n구조임무는 악천후 때문에 빠르게 중단되었다.\\n\\nThe Roman Catholic Church remains opposed to abortion.\\n로마 카톨릭 교회는 낙태에 여전히 반대하고 있다.",
                "id": 200
            },
            {
                "title": "Expertise",
                "description": "전문지식\\n엑스펄-티스\\n\\nWe're looking for someone with expertise in international trade law.\\n우리는 국제거래법에 관한 전문지식을 갖춘 사람을 찾고 있습니다.\\n\\nHe has a lot of expertise in global finance.\\n그는 국제 금융에 관한 전문지식이 풍부합니다.",
                "id": 129
            },
            {
                "title": "Regulation",
                "description": "규정, 규칙, 규제\\n\\nUnder the new regulations, e-scooters will no longer be allowed on sidewalks.\\n새로운 규제들에 따라, 전동스쿠터들은 더는 인도 위에 허용되지 않을 것이다.\\n\\nDrivers should follow traffic regulations for their safety.\\n운전자들은 자신의 안전을 위해 교통 규정을 따라야 한다.\\n\\nThere are regulations against smoking in many buildings.\\n많은 건물이 흡연을 금하는 규정을 두고 있다.",
                "id": 179
            },
            {
                "title": "Proficiency",
                "description": "숙달, 능란, 숙련, 실력\\n프로-퓌-션-시\\n\\nMy technical proficiency increases with every project I complete.\\n나의 기술적 실력은 내가 완수하는 각각의 프로젝트마다 늘어난다.\\n\\nShe has high proficiency in a number of languages.\\n그녀는 여러 언어에 높은 실력을 가지고 있다.\\n\\nThe Netherlands ranks very highly in terms of English proficiency. \\n네덜란드는 영어 숙련 면에서 아주 높게 순위를 차지한다.\\n\\nAs part of your visa application, you will need to take an English proficiency test.\\n당신의 비사 신청의 일환으로, 당신은 영어 숙련 시험을 봐야 할 것입니다.\\n\\n\\n",
                "id": 122
            },
            {
                "title": "Inefficiently",
                "description": "비효율, 비효율성\\n\\nWe realized that our approach was inefficient and that it would only cause delays.\\n우리는 우리의 접근법이 비효율적이고 그것이 오로지 지연만 일으킬 것을 깨달았다.\\n\\n",
                "id": 113
            },
            {
                "title": "route",
                "description": "길, 경로, 루트\\n루트\\n\\nWe are trying to find the quickest route from the hotel to the train station.\\n우리는 호텔에서 기차역까지 가장 빠른 길을 찾으려 하고 있다.\\n\\nThey used a map to plan their route across Spain.\\n그들은 스페인을 가로지르는 그들의 경로를 계획하기 위해 지도를 사용했다.\\n\\nSo if you need to head south from downtown, we recommend you take an alternate route.\\n그래서 만약 당신이 시내에서 남쪽으로 가야 한다면, 우리는 당신에게 다른 경로를 탈 것을 추천한다.\\n\\nThis is the quickest route through the maze.\\n이것은 그 미로를 통과하는 가장 빠른 경로이다.\\n\\nWhich route do you think will take us to the station faster?\\n어떤 길이 우리를 역까지 더 빠르게 가게 할 거로 생각합니까?\\n\\n",
                "id": 243
            },
            {
                "title": "Collaborate",
                "description": "협력하다 (to work with someone else for a special purpose)\\n\\nA team of researchers from several universities collaborated on the study.\\n\\n",
                "id": 83
            },
            {
                "title": "adjust",
                "description": "조절하다, 조정하다\\n어드저스트\\n\\nHow do I adjust the headrest on this seat?\\n이 자리에 있는 머리 받침대는 어떻게 조정하나요?\\n\\nYou can adjust the temperature if the room is too hot.\\n방이 너무 더우면 온도를 조절해도 됩니다.\\n\\nYou can adjust the straps on the backpack to make it fit you better.\\n당신은 배낭에 있는 끈을 그것이 당신에게 더 잘 맞을 수 있게 조절할 수 있습니다.",
                "id": 252
            },
            {
                "title": "Vulnerable",
                "description": "Vulnerable\\n취약한, 연약한, 피해를 입기 쉬운\\n버널-어브을\\n\\nVulnerabilities\\n취약점\\n버널-어블리티스\\n\\nI try to find vulnerabilities in my coding.\\n나는 내 코딩의 취약점을 찾으려고 노력한다.\\n\\nI try to observe a lot of vulnerabilities in my coding.\\n나는 내 코딩의 취약점 많은 것을 관찰하려고 노력한다.\\n\\nBabies are completely vulnerable without their parents.\\n아기들은 그들의 부모 없이는 완전히 연약하다.\\n\\nWhile feeding, the deer are vulnerable to predators.\\n먹이를 먹는 동안, 사슴은 포식자에게 취약하다.\\n\\nShe felt completely vulnerable after breaking up with her boyfriend.\\n그녀는 그녀의 남자친구와 헤어지고 나서 완전히 연약하게 느꼈다.",
                "id": 192
            },
            {
                "title": "Validate",
                "description": "확인하다, 검증하다\\n벨리데잇\\n\\nRevalidate\\n재검증하다\\n\\nThe research team is conducting more experiments to validate their previous findings.\\n\\nThe authenticity of the document needs to be validated before being accepted as evidence in court.\\n\\nWe use a checklist to validate that all the necessary steps have been taken.",
                "id": 199
            },
            {
                "title": "Variety",
                "description": "다양성, 품종, 여러 가지\\n붤-라이어-티\\n\\nThis lipstick comes in a wide variety of colors.\\n이 립스틱은 폭넓고 다양한 색상으로 나온다.\\n\\nThe national park is home to a wide variety of wildlife.\\n국립 공원은 넓은 품종의 야생 동물에게 집이다.\\n\\nThe study found that eating protein from a variety of sources may help prevent high blood pressure.\\n연구는 다양한 근원들에서 나온 단백질을 먹는 것이 고혈압을 예방하는 데 도움이 될지도 모른다는 것을 알아냈다.\\n\\nThis store sells a variety of different fruits.\\n이 상점은 다양한 품종의 과일을 판매한다.\\n\\nThe gym is equipped with a variety of exercise machines.\\n이 체육관은 다양한 운동 기구를 갖추고 있다.\\n\\n",
                "id": 289
            },
            {
                "title": "Sustainable",
                "description": "지속 가능한, 지속할 수 있는\\n서스-테인-어블\\n\\nSustain\\n지속하다.\\n\\nWind power is a sustainable form of energy.\\n풍력은 지속 가능한 형태의 에너지이다.\\n\\nMaking staff do overtime every week isn't sustainable.\\n직원을 매주 초과 근무하게 하는 것은 지속할 수 있지 않다.\\n\\nTraveling by train is a more comfortable and sustainable option than flying.\\n기차로 여행하는 것은 비행기를 타는 것보다 더 편안하고 지속 가능한 선택지이다.",
                "id": 124
            },
            {
                "title": "Perspective",
                "description": "관점, 1. 관점, 시각 2. 전망\\n\\nLet's try to look at your problem from a different perspective.\\n다른 관점에서 당신의 문제를 바라봅시다.\\n\\nGoing camping always gives me a fresh perspective on life.\\n캠핑은 언제나 내게 인생에 대한 새로운 시각을 제공합니다.\\n\\nI always try to understand the other person's perspective when I'm preparing a case.\\n사건을 준비할 때에는 항상 상대의 입장을 이해하려고 노력합니다.",
                "id": 163
            },
            {
                "title": "Deliberate",
                "description": "신중한\\n딜-리벌릿-트\\n\\nMy manager can be too deliberate when it comes to decision-making.\\n\\nShe is very deliberate in her thinking.\\n그녀는 매우 신중하게 생각하고 있습니다.\\n\\nI prefer to take deliberate steps toward a merger.",
                "id": 239
            },
            {
                "title": "Eager",
                "description": "열렬한, 열심인, 간절히 바라는\\n이걸\\n\\nI was eager to go on vacation after working hard all year.\\n나는 일 년 내내 열심히 일한 뒤 휴가를 가는 것을 간절히 바라고 있었다.\\n\\nThe salesman was eager to sell the car.\\n판매원은 차를 팔기 위해 열심이었다.\\n\\nShe looks eager to eat that cupcake.\\n그녀는 저 컵케이크를 먹기를 간절히 바라는 것 같다.\\n\\n------\\neagerness\\n\\nUnfortunately, the student showed no eagerness to learn.\\n\\nEvery player on the team showed their eagerness to win the match.",
                "id": 222
            },
            {
                "title": "advertising",
                "description": "광고, 광고업\\n엗-붤-타이싱\\n\\nNewspapers rely on advertising for most of their revenue.\\n신문사들은 그들 수입의 대부분을 광고에 의존한다.\\n\\nFacebook makes most of its money through advertising.\\n페이스북은 그곳의 돈 중 대부분을 광고를 통해 번다.\\n\\nIf we want to increase sales, we need to spend more on advertising.\\n만약 우리가 판매량을 증가하고 싶다면, 우리는 광고에 더 많이 써야 한다.\\n\\nBillboards are a common form of advertising.\\n게시판은 광고의 흔한 형태이다.\\n\\n",
                "id": 283
            },
            {
                "title": "merger",
                "description": "합병\\n\\nThe merger must be approved by all the shareholders.\\n합병은 주주 전체의 승인을 받아야 합니다.\\n\\nThe only alternative to a merger of the companies is some kind of drastic refinancing scheme.\\n그 회사들의 합병에 대한 유일한 대안은 과감한 재융자 계획의 어떤 일종이다.",
                "id": 240
            },
            {
                "title": "Core",
                "description": "핵심\\n\\nAsia is our core market, but we have a few clients in Europe as well.\\n아시아가 우리의 핵심 시장이지만, 우리는 유럽에도 몇몇 의뢰인들이 있다.\\n\\nOur core business is providing energy.\\n우리의 핵심 사업은 에너지를 공급하는 것이다.\\n\\nOur company's core competency is building microchips.\\n우리 회사의 핵심 역량은 마이크로칩을 조립하는 것이다.",
                "id": 176
            },
            {
                "title": "Commit",
                "description": "Commit\\n약속하다, 맡기다, 전념하다\\n\\nJennifer decided to commit to learning French this year.\\n제니퍼는 올해 프랑스어를 배우는 데 전념하기로 결정했다.\\n\\nWe've committed to a long-term contract with our supplier.\\n우리는 우리의 공급업체와의 장기 계약에 약속되었다.\\n\\nWe celebrate diversity and are committed to creating an inclusive environment for all employees.\\n\\n---------------------\\n\\nCommitment\\n헌신, 전념, 약속, 책임\\n\\nHe is lazy and shows no commitment to his job.\\n그는 게으르고 그의 직업에 대한 헌신도 보여주지 않는다.\\n\\nGetting married is a huge commitment.\\n결혼하는 것은 큰 헌신이다.\\n\\nThe late hours he works is evidence of his commitment to his clients.\\n그가 늦게까지 일하는 것은 고객에 대한 헌신의 증거입니다.\\n\\n",
                "id": 171
            },
            {
                "title": "Literal",
                "description": "문자 그대로의, 기본적인\\n\\nAccording to a literal interpretation of the Bible, Jesus is the actual son of God.\\n성경의 기본 해석에 따르면, 예수는 실제로 신의 아들이다.\\n\\nWhen she said her boss was an ape, I didn't know she was being literal.\\n그녀가 그녀의 상사가 유인원이라고 말했을 때, 나는 그녀가 말 그대로를 뜻하는지 몰랐다.\\n\\nliterally\\n문자 그대로\\n\\nI would literally lash out\\n문자그대로 나는 비난할거다.",
                "id": 151
            },
            {
                "title": "generate",
                "description": "만들어내다, 발생시키다, 생성하다, 발전하다\\n\\nWe need to find new ways to generate revenue.\\n우리는 수익 창출을 위한 새로운 길을 모색해야 합니다.\\n\\nApple generated $365 billion in revenue in 2021.\\n애플은 2021년에 수익으로 3억 6,500만 달러를 만들어 냈다.\\n\\nWe installed solar panels on the roof of our campervan to help generate electricity.\\n우리는 전기가 발전되는 것을 돕기 위해 우리의 캠핑카의 지붕에 태양 전지판을 설치했다.\\n\\nThese panels are for generating solar energy.\\n이 전지판은 태양 에너지를 생산하는 데 사용됩니다.",
                "id": 236
            },
            {
                "title": "Indicating",
                "description": "나타내다\\n\\nreport is indicating that the content is eligible to appear in Google's index.\\n\\nThe graph indicates a gradual decline.\\n그래프는 점진적 감소세를 나타냅니다.\\n\\nThe latest figures indicate that unemployment is at an all-time low.\\n최근 수치들은 실업률이 역대 최저치에 있다는 것을 나타낸다.",
                "id": 115
            },
            {
                "title": "innocent",
                "description": "순결한, 무죄인, 결백한\\n이노-슨트\\n\\nAfter a ten-month trial, he was finally declared innocent.\\n10개월의 재판 이후로 그는 드디어 결백한 거로 선고되었다.\\n\\nNo one believed that the woman was innocent.\\n아무도 그 여성이 결백하다고 믿지 않았다.\\n\\nAfter several days of discussion, the jury found him innocent.\\n며칠 간의 상의 후에, 배심원단은 그에게 무죄 판결을 내렸다.\\n\\nIn the American legal system, one is innocent until proven guilty.\\n미국 법률 제도에서는, 한 사람이 유죄라고 증명되기 이전까지는 무죄이다.\\n\\nThe lawyer claimed that she was innocent.\\n그 변호사는 그녀가 결백하다고 주장했다.\\n",
                "id": 281
            },
            {
                "title": "appropriate",
                "description": "적합한, 적절한\\n어프로-프리에잇\\n\\nIt's important to wear appropriate shoes when you go hiking.\\n하이킹하러 갈 때 적합한 신발을 신는 것은 중요하다.\\n\\nIt's not appropriate to talk so loudly on your phone on public transport.\\n대중교통에서 전화기에 그렇게 크게 말하는 것은 적절하지 않다.\\n\\nShorts are not appropriate for most offices.\\n대부분의 사무실에서 반바지 차림은 적절하지 않습니다.\\n\\nPlease wear appropriate business attire for tomorrow's meeting.\\n내일 회의에는 적합한 비즈니스 정장을 착용해주시기 바랍니다.",
                "id": 227
            },
            {
                "title": "Aware",
                "description": "알고 있는, 의식 있는, 자각하고 있는\\nawareness\\n\\nI wasn't aware of any changes to the policy.\\n나는 그 정책의 어떤 변화도 알고 있지 못했다.\\n\\nPlease be aware that your emails are not completely private.\\n당신의 이메일은 완전히 비공개가 아니라는 것을 알고 있어 주세요.\\n\\nAre you aware that your passport has expired?\\n당신의 여권이 만료되었다는 것을 알고 있습니까?\\n\\nWe are all well aware of the seriousness of the situation.\\n우리 모두 상황의 심각함을 아주 잘 지각하고 있습니다.\\n",
                "id": 144
            },
            {
                "title": "enthusiastic",
                "description": "열렬한, 열광적인\\n인-휘시-아스틱\\n\\nClara was very enthusiastic about starting her new job.\\n클라라는 그녀의 새로운 일을 시작하는 것에 관해 아주 열렬했다.\\n\\nMr. Smith is a very enthusiastic teacher and always tries to make learning fun.\\n스미스 씨는 아주 열렬한 선생님이고 항상 학습을 재미있게 만들려고 노력하신다.\\n\\nSome enthusiastic fans paint their faces with their national flags.\\n몇몇 열광적인 팬들은 그들의 얼굴들을 그들의 국기로 칠한다.",
                "id": 223
            },
            {
                "title": "Determined",
                "description": "단단히 마음먹은, 굳게 결심한, 결연한, 단호한\\n디털-민드\\n\\nShe was determined to win.\\n그녀는 이기기로 굳게 결심했다.\\n\\nShe was determined to get the job, so she spent hours preparing for the interview.\\n그녀는 그 일을 받기로 결심해서, 그녀는 면접을 위해 준비하느라 몇 시간을 보냈다.\\n\\nI'm determined to get a promotion within the next year.\\n나는 내년 안에는 승진할 것을 단단히 마음먹었다.",
                "id": 125
            },
            {
                "title": "Dominate",
                "description": "Dominate\\n지배하다, 장악하다, 우세하다\\n더미-네잇\\n\\nDominating\\n지배하는\\n\\nApple and Samsung have dominated the smartphone market for years.\\n애플과 삼성은 스마트폰 시장을 수년간 장악해왔다.\\n\\nThe plane crash dominated the headlines for weeks.\\n그 비행기 사고는 몇 주 동안 주요 뉴스들을 장악했다.\\n\\nAfter decades of being male-dominated, the gaming industry is becoming more inclusive.\\n몇십 년 남성 우위인 이후로, 게임 산업은 더 포괄적으로 되고 있다.\\n\\n-----------------------------\\n\\nDominant\\n우세한, 지배적인\\n\\nAfter winning the 1991 season, the Chicago Bulls remained dominant throughout the '90s.\\n1991년 시즌을 우승한 뒤, 시카고 불스는 90년대 내내 계속 우세했다.\\n\\nTraditionally, China has been dominant in table tennis in many international competitions.\\n전통적으로, 중국은 많은 국제 경기에서 탁구에 우세했다.\\n\\nThis company is the dominant player in the industry.\\n이 회사는 그 산업에서 지배적인 회사이다.",
                "id": 186
            },
            {
                "title": "Manufacture",
                "description": "Manufacture\\n생산, 생산하다\\n메뉴-펙-튜얼\\n\\nI don't know anything about the manufacture of cars.\\n나는 자동차 생산 에 대해서 아무것도 모른다.\\n\\nMost of the foreign workers work in shops or in manufacturing.\\n외국인 노동자의 대부분은 매장이나 생산업에서 일한다.\\n\\n---------------------------\\n\\nManufacturer\\n제조업체, 제조사, 제조자, 생산 회사\\n\\nThat company is a manufacturer of airplanes.\\n그 회사는 항공기의 제조업체다.\\n\\nThe automobile manufacturer is the largest employer in the city.\\n그 자동차 제조사는 이 도시에서 가장 큰 고용주이다.\\n",
                "id": 183
            },
            {
                "title": "Implement",
                "description": "이행하다, 구현하다, 시행하다\\n\\nImplementing this technology is something we specialize in.\\n이 기술 구현은 우리의 전문 분야입니다.\\n\\nA ban on animal testing for cosmetics has been implemented.\\n화장품을 위한 동물 실험에 대한 금지법이 시행되었다.\\n\\nEach office will have to develop a plan to implement the new regulations.\\n각 사무실별로 새 규정을 시행하기 위한 계획을 수립해야 할 것입니다.",
                "id": 178
            },
            {
                "title": "definite",
                "description": "명확한\\n데프-닛-트\\n\\nIt appears that the company has no definite plans for expansion in the near future.\\n이 회사는 당분간은 확실한 확장 계획이 없어 보입니다.\\n\\nThere is still no definite proof to support your claim.\\n당신의 주장을 지지하는 확실한 증거가 아직 없다.\\n\\nThe meeting date is now definite and won't change.\\n회의 날짜가 이제 확정되어 바뀌지 않을 것입니다.\\n\\nWe should ask for more definite directions.\\n더 정확한 방향을 물어봐야 합니다.\\n\\nShe had a definite feeling that they were lying to her.\\n그녀는 그들이 거짓말을 하고 있다는 것을 확실히 느꼈습니다.",
                "id": 279
            },
            {
                "title": "Stack",
                "description": "쌓다, 포개다\\n\\nCould you stack these boxes on top of each other?\\n이 박스를 서로의 위에 쌓아줄 수 있나요?\\n\\nWe always stack firewood in the shed to keep it dry.\\n우리는 항상 장작을 건조하게 유지하기 위해서 헛간에 쌓는다.",
                "id": 189
            },
            {
                "title": "competence",
                "description": "능력\\n\\ncompetence\\n컴펫튼스\\n\\ncompetency\\n컴펫튼시\\n\\ncompeted\\n경쟁\\n\\nProgramming competence is required in this job.\\n이 일자리는 프로그래밍 능력이 요구됩니다.",
                "id": 177
            },
            {
                "title": "Essential",
                "description": "필수의, 필수적인, 극히 중요한, 기본적인\\n\\nIt's essential to wear a helmet while riding a bicycle.\\n자전거를 탈 때 헬멧을 착용하는 것은 필수이다.\\n\\nFruits and vegetables are an essential part of a healthy diet.\\n과일들과 채소들은 건강한 식당의 극히 중요한 부분이다.\\n\\nTomatoes are an essential ingredient to Italian cooking.\\n토마토는 이탈리아 요리에 필수 재료이다.",
                "id": 142
            },
            {
                "title": "conduct",
                "description": "수행하다, 하다, 행하다, 진행하다\\n\\nHow is the interview process conducted?\\n\\nThe survey was conducted in June and had over 55,000 respondents.\\n그 설문조사는 6월에 진행되었고 55,000명 넘는 응답자들이 있었다.\\n\\nThey are conducting a scientific experiment.\\n그들은 과학 실험을 하고 있다.\\n\\nThe company is conducting job interviews.\\n그 회사는 채용 면접을 진행하고 있다.",
                "id": 288
            },
            {
                "title": "priority",
                "description": "우선 사항\\n\\nPriority will be given to applicants with experience in software engineering.\\n우선순위는 소프트웨어 공학에 경험이 있는 지원자들에게 주어질 것이다.\\n\\nBuilding affordable housing is at the top of the government's list of priorities.\\n감당할 수 있는 주택을 짓는 것이 정부의 우선 사항 명단의 꼭대기에 있다.\\n\\nThe company's priority is to provide excellent customer service and satisfaction.\\n그 회사의 우선순위는 뛰어난 고객 서비스와 만족을 제공하는 것이다.",
                "id": 271
            },
            {
                "title": "Disturb",
                "description": "방해하다, 흐트러뜨리다, 불안하게 만들다\\n디스털브\\n\\ndisturbed\\n\\nI usually meditate early in the morning when I'm less likely to be disturbed by anyone.\\n나는 이른 아침에 아무에게도 방해받지 않을 공산이 덜 있을 때 보통 명상을 한다.\\n\\nHer colleague often disturbs her when she is trying to work.\\n그녀가 일하려고 할 때 동료가 방해하는 경우가 많습니다.\\n\\nThe mother is disturbed by her daughter's temperature.\\n어머니가 딸의 체온 때문에 불안해하고 있습니다.\\n\\n",
                "id": 237
            },
            {
                "title": "regardless",
                "description": "~에 관계없이\\n\\nMy little brother always wears shorts, regardless of the weather.\\n날씨에 상관없이 내 남동생은 항상 반바지를 입는다.\\n\\nRegardless of what happens, I will be here to support you.\\n어떤 일이 일어나든 상관없이, 저는 당신을 지지하기 위해 여기에 있을 것입니다.\\n\\nHe decided to enter regardless of the sign.\\n그는 표지판에 상관없이 들어가기로 결정했다.\\n\\nRegardless of the occasion, he always wears that polka dot bow tie.\\n경우에 상관없이 그는 항상 물방울무늬 나비넥타이를 착용한다.\\n\\nUS markets will improve regardless of who wins the election.\\n미국 시장은 누가 선거에서 당선되든지 상관없이 개선될 것이다.\\n\\nShe always had fun regardless of who won.\\n그녀는 누가 이기든지 상관없이 항상 즐겼다.\\n",
                "id": 309
            },
            {
                "title": "align",
                "description": "정렬하다, 조정하다, 맞추다\\n\\nEnsure the fan blades are correctly aligned before attaching the cover.\\n덮개를 달기 전에 반드시 선풍기 날들이 알맞게 맞춰지게 하세요.\\n\\nTo ensure success, it's important to align your team's objectives with the company's overall goal.\\n성공을 확실하게 하기 위해서, 당신 팀의 목표들을 회사의 전반적인 목표와 조정하세요.\\n\\nBefore starting the car, make sure your mirrors are properly aligned.\\n\\n\\n\\n",
                "id": 315
            },
            {
                "title": "underestimate",
                "description": "과소평가하다\\n언덜-레스티-메잇\\n\\nShe underestimated the difficulty of the research project and was unable to finish it on time.\\n그녀는 그 연구 프로젝트의 어려움을 과소평가했고, 그것을 제시간에 끝낼 수 없었다.\\n\\nWe underestimated the cost of the project, and we've almost run out of money.\\n우리는 그 프로젝트의 비용을 과소평가했고, 우리는 돈이 거의 다 떨어졌다.\\n\\nNever underestimate what people can do when they work together on a shared goal.\\n사람들이 공통된 목표를 가지고 함께 일할 때 그들이 할 수 있는 것을 절대로 과소평가하지 말라.\\n\\nI admit that I underestimated her level of skill.\\n나는 내가 그녀의 능력을 과소평가했다는 것을 인정한다.\\n\\nIt's important not to underestimate the competition.\\n그 대회를 과소평가하지 않는 것이 중요하다.\\n\\n",
                "id": 317
            },
            {
                "title": "curiosity",
                "description": "호기심\\n큐리-아스리\\n\\n'Just out of curiosity'(궁금해서 그러는데)의 형태로 많이 쓰입니다\\n\\nCuriosity motivates children to learn.\\n호기심은 아이들이 배우도록 동기를 부여한다.\\n\\nThere was so much talk about the new movie that I decided to watch it out of curiosity.\\n새로운 영화에 관한 말들이 너무 많아서 나는 그것을 호기심으로 보기로 결정했다.\\n\\nI went inside the room out of curiosity.\\n\\"저는 호기심으로 방 안으로 들어갔습니다.\\"\\n\\n\\n\\n",
                "id": 318
            },
            {
                "title": "overwhelmed",
                "description": "휩싸다, 압도되다\\n오버-웸드\\n\\nHe is overwhelmed by the stress of his job.\\n그는 그의 일의 스트레스로 인해 압도되었다.\\n\\nHe was overwhelmed with excitement when his baby was born.\\n그는 그의 아기가 태어났을 때 흥분에 휩싸였다.\\n\\nWhen I visited India, I was overwhelmed by all the colors and smells.\\n내가 인도를 방문했을 때, 나는 모든 색체와 냄새에 압도되었었다.\\n\\nTom was overwhelmed by the amount of paperwork he had to do to apply for the loan.\\n톰은 대출을 신청하기 위해 그가 해야 하는 서류의 양에 압도되었다.\\n\\n",
                "id": 345
            },
            {
                "title": "consist",
                "description": "이루어져있다, ~로 구성되다\\n\\nconsist of .. 로 되어있다.\\nconsist in ... 로 이루어져 있다.\\n\\nHis exercise routine consists of running, swimming and weight lifting.\\n그의 운동 일과는 달리기, 수영, 그리고 역도로 구성되어 있다.\\n\\nMy morning routine consists of doing some yoga, reading the news and having a cup of coffee.\\n나의 오전 일과는 요가를 좀 하고, 신문을 읽고 커피 한 잔을 마시는 것으로 이루어져 있다.\\n\\nThe human heart consists of several parts that work together in a complex way.\\n인간의 심장은 복잡한 방식으로 서로 협력하는 여러 부분들로 구성되어 있다.\\n\\n",
                "id": 313
            },
            {
                "title": "executive",
                "description": "간부, 임원, 경영진\\n\\nShe has worked her way up to become a senior executive.\\n그녀는 최고 임원이 되기까지 승진했다.\\n\\nAs an executive, he often has to travel for his job.\\n임원으로서 그는 자주 출장을 가야 한다.\\n\\nHe has been one of the executives of this company for five years.\\n그는 5년간 이 회사의 임원들 중 한 명으로 있었다.\\n\\nThe executives at the meeting will do their best to address all of the problems.\\n회의에 있는 경영진들은 모든 문제를 고심하기 위해 최선을 다할 것이다.\\n\\n\\n\\n\\n",
                "id": 312
            },
            {
                "title": "regard",
                "description": "간주하다, ~으로 여기다\\n\\nThey are regarded as the leading firm in the industry.\\n그들은 업계의 선두주자로 여겨지고 있다.\\n\\nHe is regarded as a man of great intelligence and wisdom.\\n그는 엄청난 지능과 지혜를 가진 남자로 여겨진다.\\n\\nJapanese food is widely regarded as being very healthy.\\n일본 음식은 건강에 매우 좋은 것으로 널리 알려져 있다.\\n\\nThey are regarded as the leaders in their field.\\n그들은 그 분야의 선두주자로 여겨진다.\\n\\n",
                "id": 310
            },
            {
                "title": "liberty",
                "description": "자유\\n\\nAmerica is said to be the land of liberty.\\n미국은 자유의 땅이라고 한다.\\n\\nEvery human being wants liberty and happiness.\\n모든 인류는 자유와 행복을 원한다.\\n\\nBirds in a cage desire liberty.\\n새장의 새는 자유를 갈구합니다.\\n\\nMany people in the world are fighting for their liberty.\\n세상 많은 사람이 그들의 자유를 위해 싸우고 있다.\\n\\n",
                "id": 346
            },
            {
                "title": "innovative",
                "description": "혁신적인, 획기적인\\n\\nAn innovative new dating app lets users find love through their mutual friends.\\n한 획기적인 새로운 데이트 앱은 사용자들이 그들 공통의 친구들을 통해 사랑을 찾을 수 있도록 한다.\\n\\nOur electronic dictionary relies on innovative software.\\n우리 전자사전은 혁신적인 소프트웨어에 의존한다.\\n\\nWe're looking for creative people who are capable of finding innovative solutions to old problems.\\n우리는 오래된 문제들에 대한 혁신적인 방안을 찾을 수 있는 창의적인 사람들을 찾고 있습니다.\\n\\nHer innovative plan to streamline internal communications won her a promotion.\\n내부 의사소통을 간소화하는 그녀의 혁신적인 계획이 그녀에게 승진을 얻어주었다.\\n\\n",
                "id": 311
            },
            {
                "title": "instant",
                "description": "즉석의, 순식간에\\n\\nI have a cup of instant coffee as soon as I wake up in the morning.\\n나는 아침에 일어나자마자 즉석 커피를 마신다.\\n\\nI make instant coffee when I'm too busy to make regular coffee.\\n나는 일반 커피를 만들기 너무 바쁠 때는 즉석 커피를 만든다.\\n\\nClean your room this instant!\\n지금 당장 너의 방을 치워!\\n\\n",
                "id": 333
            },
            {
                "title": "invest",
                "description": "투자하다\\n\\nI invested a lot of energy and time preparing for this interview.\\n\\nInvesting in a flying car company seems risky to me.\\n비행하는 자동차 회사에 투자하는 것은 나에게 위험해 보인다.\\n\\nI've made quite a lot of money investing in collectable whisky.\\n나는 수집 가치가 있는 위스키에 투자하는 것으로 꽤 많은 돈을 벌었다.\\n\\nThe company has invested $1.3 million overall into the new project.\\n그 회사는 새로운 프로젝트에 종합적으로 130만 달러를 투자했다.\\n",
                "id": 344
            },
            {
                "title": "constantly",
                "description": "끊임없이, 항상, 계속해서, 거듭\\n\\nMy friend is constantly complaining about her boyfriend.\\n나의 친구는 그녀의 남자친구에 관해 끊임없이 불평한다.\\n\\nOur boss is constantly monitoring our progress.\\n우리 상사는 우리의 (업무) 진행 상황을 항상 감시하고 있다.\\n\\nI keep my computer running constantly.\\n나는 나의 컴퓨터를 계속해서 작동시킨다.\\n\\nI'm constantly getting emails from this recruiter.\\n나는 계속해서 이 채용담당자로부터 이메일을 받고 있다.\\n\\n",
                "id": 314
            },
            {
                "title": "brief",
                "description": "잠시, 짧은\\n\\nThe room fell silent for a brief moment.\\n\\nI caught a brief glimpse of the comet.\\n나는 얼핏 혜성을 본 것 같습니다.\\n\\nI'd like to start with a brief introduction about myself.\\n\\nA sunset lasts only a brief instant.\\n석양은 아주 잠시 머물다 사라집니다..\\n\\n",
                "id": 332
            },
            {
                "title": "perform",
                "description": "수행하다, 시행하다, 성취하다\\n\\nYour son performed remarkably well on the test.\\n댁의 아드님이 시험을 현저하게 잘 시행했습니다.\\n\\nMy son's soccer team performed really well this season.\\n내 아들의 축구팀은 이번 시즌에 잘 수행했다.\\n\\nThe Japanese soccer team performed well at the FIFA World Cup.\\n일본 축구팀은 피파 월드컵에서 잘 수행했다.\\n\\nAccording to this report, you performed very well this year.\\n이 보고서에 따르면, 당신은 이번 연도에 잘 수행했습니다.\\n\\nOur stock has been performing extremely well.\\n우리의 주식은 굉장히 잘 시행되고 있다.\\n\\nOur new laptop performed very well this year.\\n우리의 신형 노트북은 이번 연도에 (좋은 실적을) 성취했다.\\n\\n",
                "id": 340
            }
        ]`);
    const two = JSON.parse(`[
        {
            "title": "intuition",
            "description": "직관\\n인튜-이션\\n\\nShe has very good intuition for graphic design.\\n\\nChess players rely on both intuition and strategy to win games.\\n체스 선수들은 경기들에서 이기기 위해 본능과 전략 둘 다에 의존한다.\\n\\nMy intuition told me that the committee would reject our proposal.\\n\\nintuitively\\n직관적으로",
            "id": 322
        },
        {
            "title": "notify",
            "description": "알리다, 통지하다\\n\\nThe police were notified of the accident.\\n\\nThe company uses email to notify customers of upgrades.\\n회사는 이메일을 이용해서 고객에게 업그레이드를 통지합니다.\\n\\nShe asked her assistant to call and notify the clients whose orders were ready.\\n그녀는고객에게 전화해 주문한 물품이 준비되었다고 알리라고 비시에게 지시했습니다.\\n\\nnotice - 알아채다\\n\\nnotification - 공고, 알림",
            "id": 337
        },
        {
            "title": "vague",
            "description": "모호한, 희미한\\n붸-그\\n\\nI have only a vague understanding of the political situation in Israel.\\n\\nThe party has made some vague promises about tax cuts.\\n\\nHe has only a vague understanding of how to use his mobile phone.\\n그는 휴대폰 사용 방법을 대충으로밖에 모르고 있습니다.\\n\\nSince he only had a vague notion of politics, he was uncomfortable when his client asked him about the elections.\\n그는 정치에 대해서는 막연한 생각만 갖고 있었기 때문에 고객이 선거에 대해 질문하는 것이 불편했습니다.\\n\\n\\n",
            "id": 335
        },
        {
            "title": "notion",
            "description": "개념, 생각\\n노션\\n\\nNo one ever listens to his crazy notions.\\n\\nFreedom of press is a notion that many countries reject.\\n언론의 자유는 많은 국가가 거부하는 개념입니다.\\n\\nI don't know where he got the notion that I was interested in him.\\n내가 그에게 관심이 있다는 생각을 그가 어떻게 하게 되었는지 모르겠습니다.\\n\\nAs a working mother, I don't really like the notion that mothers should stay at home with their children.\\n\\n",
            "id": 336
        },
        {
            "title": "primary",
            "description": "주요, 주된, 기본적인, 주요한\\n\\nThe primary difference between the two types of employment contracts is their duration.\\n\\nThe government's primary aim with the new regulations is to reduce the cost of construction.\\n새로운 규제들에 대한 정부의 주된 목표는 건설의 비용을 줄이려는 것이다.\\n\\nChemical plants are a primary cause of air pollution.\\n화학 공장은 공기 오염의 주범입니다.\\n\\nA mother's primary concern is to take care of her children.\\n어머니의 주요 관심사는 자녀들을 돌보는 것입니다.\\n\\nIs the primary reason to get an education to be able to get a better job?\\n교육을 받는 가장 큰 이유가 더 나은 일자리를 잡기 위한 것입니까?\\n\\n\\n",
            "id": 349
        },
        {
            "title": "finalized",
            "description": "마무리짓다\\n\\nWe're meeting with the buyer today to finalize the sale.\\n우리는 판매를 마무리 짓기 위해 오늘 구매자와 만날 것이다.\\n\\nPlease send your feedback today so that we can finalize the proposal by Friday.\\n저희 금요일까지 제안을 마무리 지을 수 있도록 오늘 당신의 피드백을 보내주세요.\\n\\nWe plan to finalize our decision by the end of this week.\\n우리는 이번 주의 말까지 우리의 결정을 마무리 지을 계획이다.\\n\\n",
            "id": 331
        },
        {
            "title": "exhibit",
            "description": "전시하다, 보이다, 드러내다\\n익스-히빗\\n\\nHis paintings were exhibited at the local art gallery.\\n그의 그림은 지역의 미술관에 전시되었다.\\n\\n\\n",
            "id": 316
        },
        {
            "title": "irresponsible",
            "description": "책임지지 않는\\n\\nIt was very irresponsible of you to leave the door unlocked all night.\\n\\n\\"it would have been irresponsible just to drive on\\"",
            "id": 339
        },
        {
            "title": "emphasis",
            "description": "중요성, 강조\\n엠풰-시스\\n\\nemphasize\\n강조하다\\n\\nMy English teacher always placed a lot of emphasis on correct spelling and punctuation.\\n나의 영어 선생님은 항상 올바른 스펠링과 구두법에 많은 강조를 둔다.\\n\\nThis writer always puts emphasis on the inner thoughts of his characters.\\n이 작가는 언제나 그의 등장인물들에 대한 속마음을 강조한다.\\n\\nHe put emphasis on equality in his speech.\\n그는 연설에서 평등을 강조했다.\\n\\nMy company puts a heavy emphasis on sales results.\\n우리 회사는 매출 실적을 크게 강조한다.\\n\\n",
            "id": 330
        },
        {
            "title": "shortcoming",
            "description": "결점, 단점\\n\\nI made a list of my personal shortcomings so that I can start making improvements.\\n나는 나의 개인적인 단점 목록을 만들어서 내가 (문제의) 개선을 시작할 수 있도록 했다.\\n\\nOne of his shortcomings is that he doesn't like to consider other people's ideas.\\n그의 단점 중의 하나는 그가 다른 사람들의 의견을 고려하려하지 않는다는 것이다.\\n\\nWe need to discuss the shortcomings of this plan before deciding to carry it out.\\n우리는 그것을 실행하는 것을 결정하기 전에 이 계획의 결점에 대해 의논해야 한다.\\n\\n",
            "id": 320
        },
        {
            "title": "conflict",
            "description": "갈등, 충돌, 분쟁\\n\\nI generally try to avoid conflict at work, especially with the CEO.\\n나는 일반적으로 직장에서, 특히 최고 경영자와 갈등을 피하려고 노력한다.\\n\\nJohn often comes into conflict with his coworkers.\\n존은 종종 그의 동료들과 충돌한다.\\n\\nMost good stories include some kind of conflict.\\n대부분의 훌륭한 이야기들은 어떤 종류의 갈등을 포함한다.\\n\\nOne theme that runs through all his films is the conflict between tradition and modernity.\\n그의 모든 영화를 관통하는 하나의 주제는 전통과 현대성 사이의 갈등이다.\\n\\n",
            "id": 338
        },
        {
            "title": "irrespective",
            "description": "관계없이\\n\\nAll families are eligible for the program, irrespective of income.\\n\\n“This display is irrespective of whether it is the most relevant response to the query.”\\n\\nirrespective of whether they specify the seniority in the job",
            "id": 308
        },
        {
            "title": "district",
            "description": "구역, 지구, 지역\\n디스-트릭트\\n\\nOur office is located in the financial district.\\n우리 사무실은 금융 지구에 있다.\\n\\nThe district council makes decisions on local issues such as transportation and water management.\\n지역 의회는 교통과 물관리와 같은 지역 사안들에 대한 결정들을 만든다.\\n\\nThe school district is looking for a new superintendent.\\n그 학구(학교 지구)는 새로운 관리자를 찾고 있다.\\n\\nWe live in a very nice residential district.\\n우리는 아주 좋은 주거 구역에 산다.\\n\\n",
            "id": 343
        },
        {
            "title": "assessment",
            "description": "평가, 사정\\n\\nWe are conducting an assessment of the project.\\n우리는 그 프로젝트에 대한 평가를 실시하고 있습니다.\\n\\nWe need to conduct an assessment of all the costs involved.\\n우리는 모든 관련 비용에 대한 평가를 실시해야 합니다.\\n\\nWe hired a market researcher to carry out an assessment of buyer needs.\\n우리는 구매자 수요를 평가하기 위해 시장 조사원을 채용했습니다.\\n\\nAll employees are being asked to complete a personal skill assessment.\\n모든 직원은 개인 능력 평가를 완성하도록 요청받았다.\\n\\nAccording to our most recent assessment, we can begin production in March.\\n가장 최근에 실시한 평가에 따르면 3월부터 생산을 시작할 수 있습니다.\\n\\n",
            "id": 328
        },
        {
            "title": "rephrased",
            "description": "다시 말하다, 바꾸어 말하다\\n리-프뤠이스\\n\\nI don't quite understand your question. Could you rephrase that?\\n나는 당신의 질문을 이해하지 못했습니다. 다시 말해주시겠습니까?\\n\\nSorry, can you rephrase that?\\n\\nWhen we've got a point to make, it can be easy to keep rephrasing it over and over.\\n우리가 강조할 말이 있을 때, 그것을 계속해서 되풀이하기 쉬워질 수 있다.\\n\\nphrase - 명언, 구, 구절, 말, 문구, 구문, 문장\\n\\nI need a phrase that is more formal than this one.\\n나는 이것보다 더 정중한 구절이 필요하다.\\n\\nTell us about yourself in a short phrase.\\n짧은 구절로 당신(자신)에 대해 이야기해주세요.",
            "id": 347
        },
        {
            "title": "obstacle",
            "description": "장애\\n옵스테클\\n\\nAs a team, we have overcome all of the obstacles we've faced this year.\\n팀으로서 우리는 올해 우리가 직면했던 모든 난관을 극복했다.\\n\\nThe officers made us run the obstacle course five times.\\n장교들은 우리가 장애물 코스를 다섯 번 달리도록 만들었다.\\n\\nWe had to work as a team to climb over the obstacles.\\n우리는 장애물들 위를 타고 넘기 위해 팀으로서 노력해야 했다.\\n\\nThey had to climb over the obstacle.\\n그들은 장애물을 넘어야 했다.\\n\\n",
            "id": 319
        },
        {
            "title": "pursue",
            "description": "추격하다, 추구하다, 쫓다, 1. 추구하다, 밀고 나가다 2. 계속하다\\n\\nMy sister left her corporate job to pursue her dream of becoming a travel blogger.\\n나의 여동생은 여행 블로거가 되는 그녀의 꿈을 추구하기 위해서 그녀의 회사 직장을 떠났다.\\n\\nThe senator was accused of pursuing his own agenda rather than addressing the needs of his constituents.\\n그 상원의원은 그의 주민들의 필요를 고심하기보다 그만의 안건을 밀고 나간 것으로 비난받았다.\\n\\nA lot of Chinese students want to pursue an education in the U.S.\\n많은 중국인 학생들이 미국에서의 교육을 추구하고 싶어한다.\\n\\nThe company will pursue a new corporate identity to remain competitive in the future.\\n회사는 미래에도 경쟁력을 유지하기 위한 새로운 기업 이미지를 추구할 계획입니다.\\n\\nShe is explaining what marketing strategy the company will pursue.\\n그녀가 회사에서 추진하는 마케팅 전략을 설명하고 있습니다.\\n\\n",
            "id": 321
        },
        {
            "title": "despite",
            "description": "~에도 불구하고\\n디스-파이트\\n\\nThe couple enjoyed their walk despite the rain.\\n비에도 불구하고 그 부부는 그들의 산책을 즐겼다.\\n\\nHe won the race despite having an injured shoulder.\\n다친 어깨를 가졌음에도 불구하고 그는 경주를 이겼다.\\n\\nDespite its age, the car is in remarkably good condition.\\n그것의 연식에도 불구하고, 그 차는 현저하게 좋은 상태이다.\\n\\nThe limited-edition Bugatti has already sold out, despite being priced at over $5.5 million.\\n550만 달러 이상에 가격이 정해졌음에도 불구하고 한정판 부가티는 이미 다 팔렸다.\\n\\n\\n",
            "id": 342
        },
        {
            "title": "curated",
            "description": "선별된\\n큐뤠이트-드\\n\\nThe store carries cookware(조리기구) and appliances(자전제품 - 어플라이렌스) as well as a superbly curated selection of furniture, lamps, rugs, and other decor.\\n\\nShe curated a recent exhibit of Indian artwork.\\n\\nCurated just for you.",
            "id": 348
        },
        {
            "title": "crucial",
            "description": "중요한, 중대한, 결정적인\\n크루-셔\\n\\nMy doctor said it's crucial that I take these pills at the same time every day.\\n나의 의사는 내가 매일 같은 시간에 이 알약들을 먹는 것이 중요하다고 말했다.\\n\\nEating a balanced diet is crucial for children's development.\\n\\nIt is crucial that we operate right away.\\n\\nIt is crucial that we solve this problem right away.\\n우리가 이 문제를 즉시 해결하는 것이 중요합니다.\\n\\n",
            "id": 329
        },
        {
            "title": "accommodation",
            "description": "숙박\\n\\nThe travel agent gave us a list of accommodations available in the area.\\n\\nIt's easy to find reasonable accommodations in this town.\\n이 마을에서는 괜찮은 숙박 시설을 쉽게 찾을 수 있습니다.",
            "id": 324
        },
        {
            "title": "remarkably",
            "description": "놀라운, 주목할 만한, 뛰어난, 우수한\\n리말크-블리\\n\\nWinning the championship in his rookie year was a remarkable achievement.\\n그의 신인 선수인 해에 선수권 대회를 우승한 것은 주목할 만한 업적이었다.\\n\\nI found it remarkable that she could make such a beautiful speech on such short notice.\\n준비 시간이 짧았음에도 그녀가 그렇게 훌륭한 연설을 할 수 있다는 것이 놀랍다고 생각했다.\\n\\nDespite its remarkable population growth, the school district has managed to keep class sizes down.\\n눈에 띄는 인구 증가에도 불구하고 이 학군은 반 규모를 작게 유지해 나가고 있다.\\n\\n",
            "id": 341
        },
        {
            "title": "fluctuates",
            "description": "변동하다\\n플럿-튜에잇스\\n\\nConcerns over economic instability caused the stock market to fluctuate considerably.\\n\\nStock values fluctuate from day to day.\\n주가는 매일 변동합니다.\\n\\nThe level of the river fluctuates according to how much water the dam releases.\\n그 강의 수위는 댐 방출량에 따라 변동합니다.\\n\\nFavorable weather has prevented the prices of fruits and vegetables from fluctuating much this year.\\n올해는 날씨가 좋아 과일과 야채 가격에 큰 변동이 없습니다.\\n\\n",
            "id": 323
        },
        {
            "title": "rigit",
            "description": "엄격한\\n뤼짓\\n\\nThe airline has adopted rigid safety standards in the wake of its latest fatal crash.\\n최근의 치명적인 추락 사고 이후 항공사는 더욱 엄격한 안전 기준을 채택했습니다.\\n\\nThe rigid schedule has been forcing us to work overtime.\\n\\nThe school has very rigid rules.\\n이 학교는 교칙이 엄격합니다.\\n\\nAfter the relaxed atmosphere of academia, he was surprised by the rigid formality of government work.\\n",
            "id": 334
        }
    ]`);

    const three = JSON.parse(`[
            {
                "title": "How do others describe you?",
                "description": "- friendly\\n- logical\\n- curious person",
                "id": 71
            },
            {
                "title": "Give an example where you showed leadership and initiative",
                "description": "...",
                "id": 62
            },
            {
                "title": "Which Programming Languages and Front-End Web Development Tools Are You Proficient In?",
                "description": "...",
                "id": 267
            },
            {
                "title": "Why did you apply our company?",
                "description": "When I saw the job description,\\nI thought that it was great fit for me.\\nwhich I can handle all the technique skills that you guys posted on the skill requirement list.\\nI was looking for a job where I can 100% contribute my skills to the team members and a company\\nand at the same time I was looking for the place where I can learn new things from experienced people in the real field.\\n\\nSo I decided to apply here to work with you guys.",
                "id": 250
            },
            {
                "title": "How do you contribute to teamwork?",
                "description": "...",
                "id": 304
            },
            {
                "title": "What do you consider your best accomplishment in your last job?",
                "description": "...",
                "id": 66
            },
            {
                "title": "How do you typically handle challenging situations?",
                "description": "...",
                "id": 303
            },
            {
                "title": "Why do you want to work at our company?",
                "description": "...",
                "id": 73
            },
            {
                "title": "How do you deal with criticism?",
                "description": "...",
                "id": 61
            },
            {
                "title": "Tell me about yourself",
                "description": "...",
                "id": 49
            },
            {
                "title": "Why is there a gab from your graduation?",
                "description": "...",
                "id": 74
            },
            {
                "title": "What are you career goals?",
                "description": "...",
                "id": 70
            },
            {
                "title": "Why should we hire you? / If you were hired, what ideas/talents could you contribute to the position or our company?",
                "description": "...",
                "id": 58
            },
            {
                "title": "How do you stay organized?",
                "description": "...",
                "id": 76
            },
            {
                "title": "What kind of compensation are you looking for?",
                "description": "...\\n\\nI am seeking a position that pays between $75,000 and $80,000 annually.",
                "id": 55
            },
            {
                "title": "Talk about your weaknesses",
                "description": "1. Pronunciation\\n\\n2. Presentation\\n\\n3. Show off - I'd call myself an introvert",
                "id": 51
            },
            {
                "title": "What Do You Like About Being a Front-End Developer?",
                "description": "...",
                "id": 265
            },
            {
                "title": "What have you done to develop or change in the last few years?",
                "description": "...",
                "id": 54
            },
            {
                "title": "How Do You Stay Updated on the Latest Trends in Front-End Development?",
                "description": "...",
                "id": 268
            },
            {
                "title": "What motivates you?",
                "description": "...",
                "id": 72
            },
            {
                "title": "What are you passionate about?",
                "description": "...",
                "id": 56
            },
            {
                "title": "How do you handle stressful situations?",
                "description": "...",
                "id": 53
            },
            {
                "title": "What is your work style?",
                "description": "...",
                "id": 75
            },
            {
                "title": "In a job, what interests you most?",
                "description": "...",
                "id": 63
            },
            {
                "title": "What didn't you like about your last job?",
                "description": "...",
                "id": 64
            },
            {
                "title": "Do you work better alone or part of a team?",
                "description": "...",
                "id": 68
            },
            {
                "title": "Why have you chosen this particular field?",
                "description": "...",
                "id": 52
            },
            {
                "title": "Give an example of how you solved a problem in the past",
                "description": "...",
                "id": 57
            },
            {
                "title": "Do you have any experiences or achievements from your resume that you would like to emphasize?",
                "description": "...",
                "id": 302
            },
            {
                "title": "Talk about your strength",
                "description": "1. Problem solving skill\\n\\n2. Meticulous personality\\n\\n3. Communication",
                "id": 50
            },
            {
                "title": "Think about something you consider a failure in your life, and tell me why you think it happened",
                "description": "...",
                "id": 69
            },
            {
                "title": "Where do you see yourself in three years?",
                "description": "...",
                "id": 65
            },
            {
                "title": "What is your most confident skill or tool?",
                "description": "...",
                "id": 305
            },
            {
                "title": "Which is more important? Salary or work-life balance?",
                "description": "...",
                "id": 60
            },
            {
                "title": "What is your experience?",
                "description": "...",
                "id": 326
            },
            {
                "title": "Tell me a time you have conflict with others.",
                "description": "...",
                "id": 327
            }
        ]`);
    const four = JSON.parse(`[
            {
                "title": "What is HTML?",
                "description": "Main structure for the DOM tree.\\n\\nEasy to put the style.\\n\\nPrevent re-rendering all the pages.\\n\\nBetter SEO.",
                "id": 9
            },
            {
                "title": "What is CSS",
                "description": "Styling for the website.\\n\\nWe have to make better UI and UX because there is a bounce rate in the search ranking system.\\n\\nTalk about UI.\\n\\nTalk about UX.\\n\\nTalk about SEO.",
                "id": 10
            },
            {
                "title": "What is JavaScript",
                "description": "Action for the website.\\n\\nUser click on the button.\\n\\nAdd Event Listener.\\n\\nRequesting the server.",
                "id": 12
            },
            {
                "title": "What is React-JS",
                "description": "React JS is JavaScript's framework which maintained by Facebook.\\n\\nReact offers high level of flexibility and performance for web application development.\\n\\nWe can talk about what kind of features they are providing.\\n\\n1. React is a component-based architecture.\\n2. Virtual DOM\\n3. Single Page Application\\n4. Hook\\n5. Easy to type",
                "id": 11
            },
            {
                "title": "What is State in React?",
                "description": "...",
                "id": 13
            },
            {
                "title": "What is the hook?",
                "description": "To manage the state.\\n\\nuseState.\\n\\nuseEffect.",
                "id": 14
            },
            {
                "title": "What are the various data types of JS?",
                "description": "...",
                "id": 15
            },
            {
                "title": "What is difference between var and let?",
                "description": "...",
                "id": 16
            },
            {
                "title": "What is difference between for-loop and forEach?",
                "description": "...",
                "id": 17
            },
            {
                "title": "How do you check if it is array or not?",
                "description": "...",
                "id": 18
            },
            {
                "title": "What is Closure?",
                "description": "...",
                "id": 19
            },
            {
                "title": "What is SEO?",
                "description": "...",
                "id": 20
            },
            {
                "title": "What is reference type?",
                "description": "...",
                "id": 21
            },
            {
                "title": "What is version control?",
                "description": "...",
                "id": 22
            },
            {
                "title": "What is difference between div and span?",
                "description": "...",
                "id": 23
            },
            {
                "title": "What is Bubbling Event?",
                "description": "event.stopPropagation()",
                "id": 24
            },
            {
                "title": "How browser render the UI?",
                "description": "...",
                "id": 25
            },
            {
                "title": "What is prototype?",
                "description": "...",
                "id": 26
            },
            {
                "title": "What is AJAX",
                "description": "...",
                "id": 27
            },
            {
                "title": "What is callback function?",
                "description": "function fetchDataFromServer(callback) {\\n  // 비동기적으로 데이터를 가져오는 시뮬레이션\\n  setTimeout(function() {\\n    const data = { id: 1, name: 'John Doe' };\\n    callback(data); // 콜백 함수 호출 및 데이터 전달\\n  }, 1000); // 1초 후에 데이터 반환\\n}\\n\\nfunction displayData(data) {\\n  console.log('Received data:', data);\\n}\\n\\n// fetchDataFromServer 함수 호출하며 displayData 콜백 함수 전달\\nfetchDataFromServer(displayData);\\n\\nconsole.log('Fetching data...'); // 비동기 호출 후에도 이 문장이 먼저 실행됨",
                "id": 28
            },
            {
                "title": "What is Promise?",
                "description": "...",
                "id": 29
            },
            {
                "title": "What is async/await",
                "description": "...",
                "id": 30
            },
            {
                "title": "What are Shallow Copy and Deep Copy?",
                "description": "const newObj = structuredClone(obj);",
                "id": 31
            },
            {
                "title": "What is DOM?",
                "description": "...",
                "id": 32
            },
            {
                "title": "What is CSR and SSR?",
                "description": "...",
                "id": 33
            },
            {
                "title": "What is REST API?",
                "description": "...",
                "id": 34
            },
            {
                "title": "What is Node.js?",
                "description": "...",
                "id": 35
            },
            {
                "title": "What is Cross-browser compatibility?",
                "description": "...",
                "id": 36
            },
            {
                "title": "What are Asynchronous and Synchronous?",
                "description": "...",
                "id": 37
            },
            {
                "title": "What is hosting?",
                "description": "...",
                "id": 38
            },
            {
                "title": "What is the keyword 'this'?",
                "description": "...",
                "id": 39
            },
            {
                "title": "How do you approach accessibility when building a website?",
                "description": "...",
                "id": 40
            },
            {
                "title": "How do you approach security when building web application?",
                "description": "...",
                "id": 41
            },
            {
                "title": "Can you describe a project you have worked on that required you to use responsive design?",
                "description": "...",
                "id": 42
            },
            {
                "title": "What is IIFE?",
                "description": "...",
                "id": 43
            },
            {
                "title": "What is ES6?",
                "description": "...",
                "id": 44
            },
            {
                "title": "What is OOP?",
                "description": "...",
                "id": 45
            },
            {
                "title": "What is Call Stack?",
                "description": "...",
                "id": 46
            },
            {
                "title": "What is CI/CD",
                "description": "Continuous Integration\\nContinuous Delivery / Deployment\\n지속적 제공 / 지속적 배포\\n\\nCI에서 build test를 끝내고 \\nprepare release -> \\"STOP\\" -> deploy release\\n이 STOP 단계를 continuous delivery라고 한다.\\n\\n또는 release가 준비되자마자 배포하는것을\\nprepare release -> deploy release\\ncontinuous deployment이라고 한다.\\n\\ncode > build > test > release > deploy\\n\\nGitHub\\nBuildkite\\nGitLab CI/CD\\nBitbucket Pipelines\\n등 여러개를 사용하여 CI/CD를 제공할 수 있다.",
                "id": 86
            },
            {
                "title": "What is Delegation",
                "description": "...",
                "id": 101
            },
            {
                "title": "What is Garbage Collector?",
                "description": "...",
                "id": 102
            },
            {
                "title": "What happens when the user enters google.com in the address",
                "description": "구글서버에서 index.html을 GET 요청으로 가져 와야하는데\\n가져오는데 구글IP 주소가 필요하다.\\n그래서 google.com 이라는 도메 네임을 통해 IP 주소를 찾아야되는데 dns에 요청을 해서 구글 IP 주소를 찾아내고 그걸로 index.html을 가져와서 브라우저에 렌더링 한다.",
                "id": 103
            },
            {
                "title": "What is reflow and repaint",
                "description": "...",
                "id": 106
            },
            {
                "title": "What is Component Lifecycle?",
                "description": "...",
                "id": 107
            },
            {
                "title": "How do you Memory Leak Optimization?",
                "description": "Memory Leak Optimization\\nor\\nMemory Accumulation Optimization\\n\\n이는 프로그램이 실행되는 동안 메모리 누적을 최소화하고 메모리 리소스를 효율적으로 관리하는 것을 의미합니다.\\n\\nMinimizing memory accumulation and efficiently managing memory resources during program execution",
                "id": 109
            },
            {
                "title": "How do you improve web performance?",
                "description": "...",
                "id": 108
            },
            {
                "title": "What is Array?",
                "description": "...",
                "id": 258
            },
            {
                "title": "What is Object?",
                "description": "...",
                "id": 259
            },
            {
                "title": "What is difference between margin and padding?",
                "description": "...",
                "id": 264
            },
            {
                "title": "What is difference between TCP and UDP ",
                "description": "...",
                "id": 263
            },
            {
                "title": "How do you handle Event Delegation in React?",
                "description": "...",
                "id": 262
            },
            {
                "title": "Tell Me How You Would Use REST Web Services for Front-End Development.",
                "description": "...",
                "id": 269
            },
            {
                "title": "What is Higher Order Components?",
                "description": "...",
                "id": 293
            },
            {
                "title": "what is Memorization?",
                "description": "...",
                "id": 292
            },
            {
                "title": "what is One way data binding?",
                "description": "...",
                "id": 291
            },
            {
                "title": "pseudo classes, elements in css",
                "description": "...",
                "id": 294
            },
            {
                "title": "How Would You Ensure a Website Is User-Friendly and Easy to Navigate?",
                "description": "...",
                "id": 266
            },
            {
                "title": "What is Higher Order Functions?",
                "description": "...",
                "id": 295
            },
            {
                "title": "What is scope chain?",
                "description": "...",
                "id": 299
            },
            {
                "title": "What is the most challenging experience in development that you had until now?",
                "description": "...",
                "id": 325
            }
        ]`);

    // console.log(first, second, third, completed, vocabID);
    // const one = JSON.stringify(first);
    // const two = JSON.stringify(second);
    // const three = JSON.stringify(third);
    // const four = JSON.stringify(completed);
    // console.log(one);
    // console.log(two);
    // console.log(three);
    // console.log(four);
    // clearData();
    setUpdate(one, two, three, completed, 350);
  }

  const currentZone: number = useStore((store) => store.currentZone);
  const currentPosition = useStore((store) => store.currentPosition);
  const isViewFront = useStore((store) => store.isViewFront);
  const setViewFront = useStore((store) => store.setViewFront);

  const [isDragging, setDragging] = useState<boolean>(false);
  const [posX, setPosX] = useState<number>(0);

  // managing the current position
  function managePosition(left: string): void {
    // check if the user dragged to left or right
    const isLeft = left === "left";

    const vocabSize = vocabs[currentZone].length - 1;

    if (refScreen.current) {
      refScreen.current.scrollTo(0, 0);
      setViewFront(true);
    }

    if (isLeft) {
      setMovedLeft({ trigger: true, isLeft: true });

      // if current position is 0, then move to last index of array
      currentPosition === 0
        ? setCurrentPosition(vocabSize)
        : setCurrentPosition(currentPosition - 1);
    } else {
      setMovedLeft({ trigger: true, isLeft: false });

      // if current position is last index of array, then move to 0
      currentPosition === vocabSize
        ? setCurrentPosition(0)
        : setCurrentPosition(currentPosition + 1);
    }
  }

  function keyDownHandler(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowLeft") {
      managePosition("left");
    } else if (e.key === "ArrowRight") {
      managePosition("right");
    }
  }

  // when clicked dragging trigger is on
  function pointerDownHandler(): void {
    setDragging(true);
  }

  // while dragging
  function pointerMoveHandler(e: React.MouseEvent<HTMLDivElement>) {
    if (isDragging) {
      const { movementX } = e;
      setPosX((prev) => prev + movementX);
    }
  }

  // when pointer is stopped
  function pointerCancelHandler() {
    // if the user has dragged more than 80 pixel
    if (posX > 80) {
      managePosition("left");
    } else if (posX < -80) {
      managePosition("right");
    }

    setDragging(false);
    setPosX(0);
  }

  return (
    <div className="vocabs__content" onClick={clickHandler}>
      {vocabs[currentZone].length > 0 ? (
        <div
          className="vocabs__items"
          style={{
            transform: `rotateY(${isViewFront ? "0deg" : "180deg"})`,
          }}
          tabIndex={0}
          onPointerDown={pointerDownHandler}
          onPointerMove={pointerMoveHandler}
          onPointerUp={pointerCancelHandler}
          onPointerLeave={pointerCancelHandler}
          onKeyDown={keyDownHandler}
        >
          <div className="vocabs__items__front vocabs__items__front--title">
            <p>
              {vocabs[currentZone][currentPosition]?.title && (
                <b>{vocabs[currentZone][currentPosition].title}</b>
              )}
            </p>
          </div>
          <div ref={refScreen} className="vocabs__items__back">
            {vocabs[currentZone][currentPosition]?.description && (
              <p>{vocabs[currentZone][currentPosition].description}</p>
            )}
          </div>
        </div>
      ) : (
        // when the current zone has no item
        <div className="vocabs__items">
          <div className="vocabs__items__front vocabs__items__front--none">
            <p>
              You have no vocabs in{" "}
              <span>
                {units[currentZone].charAt(0).toUpperCase() +
                  units[currentZone].slice(1)}{" "}
              </span>
              Floor !
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VocabDisplay;
