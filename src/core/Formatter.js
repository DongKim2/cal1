/**
 * Formatter 클래스
 * 숫자와 수식을 사용자 친화적인 형식으로 포맷팅합니다.
 */
class Formatter {
    /**
     * 숫자를 포맷팅합니다.
     * @param {number} num - 포맷팅할 숫자
     * @param {number} [decimalPlaces] - 소수점 자릿수 (선택적)
     * @returns {string} 포맷팅된 숫자 문자열
     */
    static formatNumber(num, decimalPlaces) {
        // NaN 처리
        if (isNaN(num)) {
            return 'Error'
        }

        // Infinity 처리
        if (num === Infinity) {
            return '∞'
        }
        if (num === -Infinity) {
            return '-∞'
        }

        // 매우 큰 수 또는 매우 작은 수는 과학적 표기법 사용
        if (Math.abs(num) >= 1e16 || (Math.abs(num) < 1e-6 && num !== 0)) {
            return num.toExponential()
        }

        // 소수점 자릿수 제한
        let result = num
        if (decimalPlaces !== undefined) {
            result = Number(num.toFixed(decimalPlaces))
        }

        // 숫자를 문자열로 변환
        const numStr = result.toString()

        // 정수 부분과 소수 부분 분리
        const parts = numStr.split('.')
        const integerPart = parts[0]
        const decimalPart = parts[1]

        // 천 단위 구분 쉼표 추가
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

        // 소수 부분이 있으면 결합
        return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger
    }

    /**
     * 수식을 사용자 친화적인 형식으로 포맷팅합니다.
     * @param {string} expression - 포맷팅할 수식
     * @returns {string} 포맷팅된 수식
     */
    static formatExpression(expression) {
        if (!expression) {
            return ''
        }

        let formatted = expression

        // 연산자 변환
        formatted = formatted.replace(/\*/g, '×')
        formatted = formatted.replace(/\//g, '÷')

        // 상수 변환 (대소문자 구분 없이)
        formatted = formatted.replace(/\bpi\b/gi, 'π')

        return formatted
    }
}

export default Formatter
