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
├── main.tsx          # 애플리케이션 진입점
├── App.tsx           # 메인 App 컴포넌트
├── App.css           # App 스타일
├── index.css         # 전역 스타일
└── assets/           # 정적 리소스 (이미지, 아이콘 등)

public/               # 퍼블릭 정적 파일
```

## Architecture Guidelines

### Component Structure
- 컴포넌트는 `src/components/` 디렉토리에 작성
- 각 컴포넌트는 독립적인 디렉토리 또는 파일로 관리
- TypeScript 인터페이스를 사용하여 props 타입 정의

### State Management (Todo 앱)
Todo 앱 개발 시 고려사항:
- **Local State**: 간단한 Todo 기능은 `useState` 사용
- **Context API**: 여러 컴포넌트에서 Todo 상태 공유가 필요한 경우
- **외부 라이브러리**: 복잡한 상태 관리가 필요하면 Zustand나 Redux Toolkit 고려

### Todo App 기능 권장사항
1. Todo 추가/삭제/수정
2. Todo 완료 상태 토글
3. 필터링 (전체/완료/미완료)
4. LocalStorage를 활용한 데이터 영속성
5. 반응형 디자인

## TypeScript Configuration

- `tsconfig.app.json`: 애플리케이션 코드용 설정
- `tsconfig.node.json`: Vite 설정 파일용 설정
- `tsconfig.json`: 베이스 설정

## Vite Features

- **Hot Module Replacement (HMR)**: 코드 변경 시 즉시 반영
- **Fast Refresh**: React 컴포넌트 수정 시 상태 유지
- **TypeScript Support**: 별도 설정 없이 TypeScript 사용 가능
