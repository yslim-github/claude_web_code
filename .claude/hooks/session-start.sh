#!/bin/bash

# Session Start Hook
# 이 스크립트는 Claude Code 세션이 시작될 때 자동으로 실행됩니다

echo "🚀 Todo App 개발 환경 설정 중..."
echo ""

# 1. 의존성 확인
if [ ! -d "node_modules" ]; then
    echo "📦 의존성 설치 중..."
    npm install
else
    echo "✅ 의존성이 이미 설치되어 있습니다"
fi

# 2. 린트 검사
echo ""
echo "🔍 코드 품질 검사 중..."
npm run lint --silent || echo "⚠️  린트 경고가 있습니다"

# 3. 타입 체크
echo ""
echo "📝 TypeScript 타입 체크..."
npx tsc --noEmit || echo "⚠️  타입 오류가 있습니다"

# 4. 테스트 실행 (빠른 검증)
echo ""
echo "🧪 테스트 실행 중..."
npm run test:run --silent || echo "⚠️  일부 테스트가 실패했습니다"

echo ""
echo "✨ 개발 환경 준비 완료!"
echo "💡 Tip: 다음 명령어를 사용할 수 있습니다:"
echo "   - /test: 테스트 실행"
echo "   - /review-code: 코드 리뷰"
echo "   - /optimize: 성능 최적화"
