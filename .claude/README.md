# Claude Code 설정

이 디렉토리는 Claude Code의 프로젝트별 설정을 포함합니다.

## 📁 구조

```
.claude/
├── commands/           # 커스텀 slash commands
│   ├── test.md        # /test - 테스트 실행
│   ├── review-code.md # /review-code - 코드 리뷰
│   └── optimize.md    # /optimize - 성능 최적화
├── hooks/             # 이벤트 훅
│   └── session-start.sh # 세션 시작 시 실행
└── README.md          # 이 파일
```

## 🎯 사용 방법

### Slash Commands

채팅에서 `/` 를 입력하면 사용 가능한 명령어 목록이 표시됩니다:

- `/test` - 프로젝트 테스트 실행 및 결과 보고
- `/review-code` - 코드 리뷰 수행
- `/optimize` - 성능 최적화 기회 탐색

### Hooks

Hooks는 특정 이벤트 발생 시 자동으로 실행됩니다:

- `session-start.sh` - Claude Code 세션 시작 시 실행
  - 의존성 설치 확인
  - 린트 및 타입 체크
  - 테스트 실행

## 🔧 커스터마이징

### 새로운 명령어 추가

`.claude/commands/` 에 마크다운 파일을 추가:

```bash
# .claude/commands/my-command.md
# My Command

이 명령어가 수행할 작업을 설명합니다.
```

사용: `/my-command`

### Hook 수정

`.claude/hooks/session-start.sh` 를 편집하여 세션 시작 시 동작을 커스터마이징할 수 있습니다.

## 📚 더 알아보기

- [Claude Code 문서](https://docs.claude.com/claude-code)
- [Slash Commands 가이드](https://docs.claude.com/claude-code/slash-commands)
- [Hooks 가이드](https://docs.claude.com/claude-code/hooks)
