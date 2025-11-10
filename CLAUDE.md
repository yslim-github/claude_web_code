# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Todo 앱 - React + TypeScript + Vite로 구축된 모던 웹 애플리케이션

## Tech Stack

- **Frontend Framework**: React 19.2
- **Language**: TypeScript 5.9
- **Build Tool**: Vite 7.2
- **Linter**: ESLint 9.39

## Development Commands

### 개발 서버 실행
```bash
npm run dev
```
로컬 개발 서버를 시작합니다 (기본적으로 http://localhost:5173)

### 프로덕션 빌드
```bash
npm run build
```
TypeScript 컴파일 후 프로덕션용 빌드를 생성합니다. 결과물은 `dist/` 디렉토리에 저장됩니다.

### 린트 검사
```bash
npm run lint
```
ESLint를 실행하여 코드 품질을 확인합니다.

### 프로덕션 빌드 미리보기
```bash
npm run preview
```
빌드된 프로덕션 버전을 로컬에서 미리 확인합니다.

## Project Structure

```
src/
├── main.tsx                    # 애플리케이션 진입점
├── App.tsx                     # 메인 App 컴포넌트 (커스텀 훅 사용)
├── App.css                     # 전역 스타일
├── index.css                   # 기본 스타일
├── types/
│   └── todo.ts                 # TypeScript 타입 정의
├── hooks/
│   ├── useLocalStorage.ts      # LocalStorage 관리 훅
│   ├── useTodos.ts             # Todo 상태 관리 훅
│   └── useFilter.ts            # 필터링 로직 훅
├── components/
│   ├── common/                 # 재사용 가능한 공통 컴포넌트
│   │   ├── Button.tsx          # 버튼 컴포넌트 (variant: primary/danger/secondary)
│   │   ├── Input.tsx           # 입력 필드 컴포넌트
│   │   └── Checkbox.tsx        # 체크박스 컴포넌트
│   ├── TodoInput.tsx           # Todo 입력 폼
│   ├── TodoItem.tsx            # 개별 Todo 아이템
│   ├── TodoList.tsx            # Todo 목록 컨테이너
│   └── TodoFilter.tsx          # 필터 버튼
└── assets/                     # 정적 리소스

public/                         # 퍼블릭 정적 파일
```

## Architecture Guidelines

### Component Structure
- **공통 컴포넌트**: `src/components/common/`에 재사용 가능한 UI 컴포넌트 작성
- **기능 컴포넌트**: `src/components/`에 도메인 특화 컴포넌트 작성
- TypeScript 인터페이스를 사용하여 props 타입 정의
- 각 컴포넌트는 단일 책임 원칙(SRP)을 따름

### Custom Hooks Pattern
로직을 커스텀 훅으로 분리하여 재사용성과 테스트 용이성 향상:

- **useLocalStorage**: LocalStorage와 상태를 자동으로 동기화
- **useTodos**: Todo CRUD 작업 관리 (추가, 수정, 삭제, 토글)
- **useFilter**: Todo 필터링 로직 (전체/진행중/완료)

### State Management
- **커스텀 훅**: 복잡한 상태 로직은 커스텀 훅으로 분리
- **로컬 스토리지**: 데이터 영속성을 위해 LocalStorage 사용
- 상태는 가능한 한 컴포넌트 트리의 하위에 배치

### Common Components
재사용 가능한 공통 컴포넌트 사용:
- `Button`: variant prop으로 스타일 변경 (primary, danger, secondary)
- `Input`: error prop으로 검증 오류 표시
- `Checkbox`: 일관된 체크박스 UI

### Code Organization
- 타입 정의는 `src/types/`에 중앙 관리
- 비즈니스 로직은 커스텀 훅으로 분리
- UI 컴포넌트는 프레젠테이션 로직만 포함

## TypeScript Configuration

- `tsconfig.app.json`: 애플리케이션 코드용 설정
- `tsconfig.node.json`: Vite 설정 파일용 설정
- `tsconfig.json`: 베이스 설정

## Vite Features

- **Hot Module Replacement (HMR)**: 코드 변경 시 즉시 반영
- **Fast Refresh**: React 컴포넌트 수정 시 상태 유지
- **TypeScript Support**: 별도 설정 없이 TypeScript 사용 가능
