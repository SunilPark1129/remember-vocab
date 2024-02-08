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

  const currentZone: number = useStore((store) => store.currentZone);
  const currentPosition = useStore((store) => store.currentPosition);
  const isViewFront = useStore((store) => store.isViewFront);
  const setViewFront = useStore((store) => store.setViewFront);
  const setUpdate = useStore((store) => store.setUpdate);

  function clickHandler() {
    const obj = [
      {
        title: "What is HTML?",
        description:
          "Main structure for the DOM tree.\n\nEasy to put the style.\n\nPrevent re-rendering all the pages.\n\nBetter SEO.",
        id: 9,
      },
      {
        title: "What is CSS",
        description:
          "Styling for the website.\n\nWe have to make better UI and UX because there is a bounce rate in the search ranking system.\n\nTalk about UI.\n\nTalk about UX.\n\nTalk about SEO.",
        id: 10,
      },
      {
        title: "What is JavaScript",
        description:
          "Action for the website.\n\nUser click on the button.\n\nAdd Event Listener.\n\nRequesting the server.",
        id: 12,
      },
      {
        title: "What is React-JS",
        description:
          "React JS is JavaScript's framework which maintained by Facebook.\n\nReact offers high level of flexibility and performance for web application development.\n\nWe can talk about what kind of features they are providing.\n\n1. React is a component-based architecture.\n2. Virtual DOM\n3. Single Page Application\n4. Hook\n5. Easy to type",
        id: 11,
      },
      {
        title: "What is State in React?",
        description: "...",
        id: 13,
      },
      {
        title: "What is the hook?",
        description: "To manage the state.\n\nuseState.\n\nuseEffect.",
        id: 14,
      },
      {
        title: "What are the various data types of JS?",
        description: "...",
        id: 15,
      },
      {
        title: "What is difference between var and let?",
        description: "...",
        id: 16,
      },
      {
        title: "What is difference between for-loop and forEach?",
        description: "...",
        id: 17,
      },
      {
        title: "How do you check if it is array or not?",
        description: "...",
        id: 18,
      },
      {
        title: "What is Closure?",
        description: "...",
        id: 19,
      },
      {
        title: "What is SEO?",
        description: "...",
        id: 20,
      },
      {
        title: "What is reference type?",
        description: "...",
        id: 21,
      },
      {
        title: "What is version control?",
        description: "...",
        id: 22,
      },
      {
        title: "What is difference between div and span?",
        description: "...",
        id: 23,
      },
      {
        title: "What is Bubbling Event?",
        description: "event.stopPropagation()",
        id: 24,
      },
      {
        title: "How browser render the UI?",
        description: "...",
        id: 25,
      },
      {
        title: "What is prototype?",
        description: "...",
        id: 26,
      },
      {
        title: "What is AJAX",
        description: "...",
        id: 27,
      },
      {
        title: "What is callback function?",
        description:
          "function fetchDataFromServer(callback) {\n  // 비동기적으로 데이터를 가져오는 시뮬레이션\n  setTimeout(function() {\n    const data = { id: 1, name: 'John Doe' };\n    callback(data); // 콜백 함수 호출 및 데이터 전달\n  }, 1000); // 1초 후에 데이터 반환\n}\n\nfunction displayData(data) {\n  console.log('Received data:', data);\n}\n\n// fetchDataFromServer 함수 호출하며 displayData 콜백 함수 전달\nfetchDataFromServer(displayData);\n\nconsole.log('Fetching data...'); // 비동기 호출 후에도 이 문장이 먼저 실행됨",
        id: 28,
      },
      {
        title: "What is Promise?",
        description: "...",
        id: 29,
      },
      {
        title: "What is async/await",
        description: "...",
        id: 30,
      },
      {
        title: "What are Shallow Copy and Deep Copy?",
        description: "const newObj = structuredClone(obj);",
        id: 31,
      },
      {
        title: "What is DOM?",
        description: "...",
        id: 32,
      },
      {
        title: "What is CSR and SSR?",
        description: "...",
        id: 33,
      },
      {
        title: "What is REST API?",
        description: "...",
        id: 34,
      },
      {
        title: "What is Node.js?",
        description: "...",
        id: 35,
      },
      {
        title: "What is Cross-browser compatibility?",
        description: "...",
        id: 36,
      },
      {
        title: "What are Asynchronous and Synchronous?",
        description: "...",
        id: 37,
      },
      {
        title: "What is hosting?",
        description: "...",
        id: 38,
      },
      {
        title: "What is the keyword `this`?",
        description: "...",
        id: 39,
      },
      {
        title: "How do you approach accessibility when building a website?",
        description: "...",
        id: 40,
      },
      {
        title: "How do you approach security when building web application?",
        description: "...",
        id: 41,
      },
      {
        title:
          "Can you describe a project you have worked on that required you to use responsive design?",
        description: "...",
        id: 42,
      },
      {
        title: "What is IIFE?",
        description: "...",
        id: 43,
      },
      {
        title: "What is ES6?",
        description: "...",
        id: 44,
      },
      {
        title: "What is OOP?",
        description: "...",
        id: 45,
      },
      {
        title: "What is Call Stack?",
        description: "...",
        id: 46,
      },
      {
        title: "What is CI/CD",
        description:
          'Continuous Integration\nContinuous Delivery / Deployment\n지속적 제공 / 지속적 배포\n\nCI에서 build test를 끝내고 \nprepare release -> "STOP" -> deploy release\n이 STOP 단계를 continuous delivery라고 한다.\n\n또는 release가 준비되자마자 배포하는것을\nprepare release -> deploy release\ncontinuous deployment이라고 한다.\n\ncode > build > test > release > deploy\n\nGitHub\nBuildkite\nGitLab CI/CD\nBitbucket Pipelines\n등 여러개를 사용하여 CI/CD를 제공할 수 있다.',
        id: 86,
      },
      {
        title: "What is Delegation",
        description: "...",
        id: 101,
      },
      {
        title: "What is Garbage Collector?",
        description: "...",
        id: 102,
      },
      {
        title: "What happens when the user enters google.com in the address",
        description:
          "구글서버에서 index.html을 GET 요청으로 가져 와야하는데\n가져오는데 구글IP 주소가 필요하다.\n그래서 google.com 이라는 도메 네임을 통해 IP 주소를 찾아야되는데 dns에 요청을 해서 구글 IP 주소를 찾아내고 그걸로 index.html을 가져와서 브라우저에 렌더링 한다.",
        id: 103,
      },
      {
        title: "What is reflow and repaint",
        description: "...",
        id: 106,
      },
      {
        title: "What is Component Lifecycle?",
        description: "...",
        id: 107,
      },
      {
        title: "How do you Memory Leak Optimization?",
        description:
          "Memory Leak Optimization\nor\nMemory Accumulation Optimization\n\n이는 프로그램이 실행되는 동안 메모리 누적을 최소화하고 메모리 리소스를 효율적으로 관리하는 것을 의미합니다.\n\nMinimizing memory accumulation and efficiently managing memory resources during program execution",
        id: 109,
      },
      {
        title: "How do you improve web performance?",
        description: "...",
        id: 108,
      },
      {
        title: "What is Array?",
        description: "...",
        id: 258,
      },
      {
        title: "What is Object?",
        description: "...",
        id: 259,
      },
      {
        title: "What is difference between margin and padding?",
        description: "...",
        id: 264,
      },
      {
        title: "What is difference between TCP and UDP ",
        description: "...",
        id: 263,
      },
      {
        title: "How do you handle Event Delegation in React?",
        description: "...",
        id: 262,
      },
      {
        title:
          "Tell Me How You Would Use REST Web Services for Front-End Development.",
        description: "...",
        id: 269,
      },
      {
        title: "What is Higher Order Components?",
        description: "...",
        id: 293,
      },
      {
        title: "what is Memorization?",
        description: "...",
        id: 292,
      },
      {
        title: "what is One way data binding?",
        description: "...",
        id: 291,
      },
      {
        title: "pseudo classes, elements in css",
        description: "...",
        id: 294,
      },
      {
        title:
          "How Would You Ensure a Website Is User-Friendly and Easy to Navigate?",
        description: "...",
        id: 266,
      },
      {
        title: "What is Higher Order Functions?",
        description: "...",
        id: 295,
      },
      {
        title: "What is scope chain?",
        description: "...",
        id: 299,
      },
      {
        title:
          "What is the most challenging experience in development that you had until now?",
        description: "...",
        id: 325,
      },
    ];
    setUpdate(obj);
  }

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
