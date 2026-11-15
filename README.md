# Week 11

## Project Information

## Installation
Node.js 20.19+ 또는 22.12+ 권장.

```bash
npm install
npm run dev
```

브라우저에 표시되는 Local URL에 접속하세요. 빌드 테스트: `npm run build`.

## Source Code Exploration

### Project Structure: 주요 파일 3개의 역할
- **App.jsx**: 헤더, 푸터 구현 및 과목 리스트 컴포넌트 불러오는 역할
- **CourseList.jsx**: 과목 추가, 조회, 삭제 기능을 제공하고 개별 과목 컴포넌트를 호출하는 역할
- **CourseItem.jsx**: 부모에게 받은 개별 과목 정보를 화면에 그리는 역할

### Component & Props: CourseList와 CourseItem의 관계 및 Props 전달 방식
CourseList가 부모, CourseItem이 자식이며, key와 corse를 통해 과목 정보를 넘기고, onDelete와 onToggle에 콜백 함수 정보를 넘겨서 자식 쪽에서 삭제와 토글 기능을 요청할 수 있게 한다.

### State & Event: useState를 이용한 상태 관리 및 삭제 버튼의 동작 원리
useState를 이용하여 컴포넌트 내에서 변수처럼 이용할 수 있으며, `const [newName, setNewName] = useState('');`로 선언 되어 있다면 newName을 통해 조회, setNewName()을 통해 값을 변경할 수 있다. 
삭제 버튼 자체는 자식 컴포넌트 쪽에 있으며, 기능 구현은 부모 컴포넌트에 되어있다. 이때 부모 컴포넌트 쪽에서 기능이 구현된 함수를 콜백 함수 형태로 자식에게 넘겨서 삭제 버튼이 동작할 수 있게한다. 자식이 부모에게 기능을 요청하는 것이다.

### Code Analysis: 주요 코드 2개(각 5~15줄)를 선택하여 동작 원리 설명
```jsx
// CourseList.jsx
{courses.map(course => (
    <CourseItem key={course.id} course={course} onDelete={handleDelete} onToggle={handleToggle} />
))}

// CourseItem.jsx
export default function CourseItem({ course, onDelete, onToggle }) {
  return (
    <div className="course-row">
      <div className="course-main">
        <input
          className="check"
          type="checkbox"
          checked={course.completed}
          onChange={() => onToggle(course.id)}
          aria-label={`${course.name} 완료 여부`}
        />
        // 생략
```
CourseList에서 CourseItem으로 props를 넘기고 CourseItem 쪽에서 받은 정보를 사용하는 코드이다. `key={course.id}`와 같은 형태로 데이터를 자식으로 넘기고, `onDelete={handleDelete}` 같은 형태로 콜백 함수를 넘긴다.

```jsx
// CourseList.jsx
const [courses, setCourses] = useState(initialCourses);

function handleDelete(id) {
  if (!window.confirm('이 과목을 삭제하시겠습니까?')) return;
  setCourses(previous => previous.filter(course => course.id !== id));
}

const doneCount = courses.filter(course => course.completed).length;
```
과목 목록을 state로 관리하고 삭제 기능을 구현한 코드이다. `useState(initialCourses)`로 초기 과목 배열을 state로 선언하고, `handleDelete`에서 `filter`를 통해 전달받은 id와 다른 과목만 남긴 새 배열을 만들어 `setCourses()`로 값을 변경한다. state가 변경되면 화면이 다시 그려지면서 `doneCount`도 새로 계산된다.




## Customizing
- **src/data/courses.js**: 초기 과목 데이터를 이번 학기 수강 과목 6개로 변경했다.
- **src/App.jsx, index.html**: 프로젝트 제목을 `Course Tracker`로 바꾸고, 설명과 상단 문구, 태그, 푸터, 브라우저 탭 제목을 변경했다.
- **src/App.css**: 다음과 같이 스타일을 변경했다.
  - 메인 색상을 파란색에서 초록색(`#1f9d55`)으로 변경 (상단 문구, Add 버튼, 태그, 체크박스, 입력창 포커스)
  - 페이지 배경, 과목 분류 태그 색상을 초록 계열로 변경
  - 패널의 `border-radius`를 18px에서 22px로 변경
  - 과목 행에 마우스를 올리면 배경색이 바뀌도록 hover 효과 추가

## Feature Extension

## Deployment

## Weekly Review:
- 새롭게 배운 내용 3가지
- 어려웠던 점과 해결 방법
- AI 활용 내용 및 느낀 점