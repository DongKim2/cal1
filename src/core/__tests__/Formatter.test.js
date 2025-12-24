import { describe, it, expect } from 'vitest'
import Formatter from '../Formatter'

describe('Formatter', () => {
    describe('formatNumber', () => {
        describe('기본 숫자 포맷팅', () => {
            it('천 단위 구분 쉼표를 추가한다', () => {
                expect(Formatter.formatNumber(1000)).toBe('1,000')
                expect(Formatter.formatNumber(1000000)).toBe('1,000,000')
                expect(Formatter.formatNumber(123456789)).toBe('123,456,789')
            })

            it('소수점을 올바르게 처리한다', () => {
                expect(Formatter.formatNumber(3.14159265)).toBe('3.14159265')
                expect(Formatter.formatNumber(0.123456789)).toBe('0.123456789')
            })

            it('0을 올바르게 처리한다', () => {
                expect(Formatter.formatNumber(0)).toBe('0')
            })

            it('음수를 올바르게 처리한다', () => {
                expect(Formatter.formatNumber(-1000)).toBe('-1,000')
                expect(Formatter.formatNumber(-3.14)).toBe('-3.14')
            })

            it('소수점 자릿수를 제한한다', () => {
                expect(Formatter.formatNumber(3.14159265, 2)).toBe('3.14')
                expect(Formatter.formatNumber(3.14159265, 4)).toBe('3.1416')
                expect(Formatter.formatNumber(10, 2)).toBe('10')
            })
        })

        describe('특수 케이스 처리', () => {
            it('NaN을 "Error"로 변환한다', () => {
                expect(Formatter.formatNumber(NaN)).toBe('Error')
            })

            it('Infinity를 "∞"로 변환한다', () => {
                expect(Formatter.formatNumber(Infinity)).toBe('∞')
                expect(Formatter.formatNumber(-Infinity)).toBe('-∞')
            })

            it('매우 큰 수를 과학적 표기법으로 변환한다', () => {
                const result = Formatter.formatNumber(1e16)
                expect(result).toMatch(/e\+/)
            })

            it('매우 작은 수를 과학적 표기법으로 변환한다', () => {
                const result = Formatter.formatNumber(1e-7)
                expect(result).toMatch(/e-/)
            })
        })
    })

    describe('formatExpression', () => {
        describe('연산자 변환', () => {
            it('* 를 × 로 변환한다', () => {
                expect(Formatter.formatExpression('2*3')).toBe('2×3')
                expect(Formatter.formatExpression('10*5*2')).toBe('10×5×2')
            })

            it('/ 를 ÷ 로 변환한다', () => {
                expect(Formatter.formatExpression('10/2')).toBe('10÷2')
                expect(Formatter.formatExpression('100/10/2')).toBe('100÷10÷2')
            })

            it('여러 연산자를 동시에 변환한다', () => {
                expect(Formatter.formatExpression('2*3/4')).toBe('2×3÷4')
            })
        })

        describe('상수 변환', () => {
            it('pi를 π로 변환한다', () => {
                expect(Formatter.formatExpression('pi')).toBe('π')
                expect(Formatter.formatExpression('2*pi')).toBe('2×π')
            })

            it('대소문자 구분 없이 pi를 변환한다', () => {
                expect(Formatter.formatExpression('PI')).toBe('π')
                expect(Formatter.formatExpression('Pi')).toBe('π')
            })
        })

        describe('복합 수식', () => {
            it('복잡한 수식을 올바르게 포맷팅한다', () => {
                expect(Formatter.formatExpression('sin(45)*pi/2')).toBe('sin(45)×π÷2')
            })

            it('빈 문자열을 그대로 반환한다', () => {
                expect(Formatter.formatExpression('')).toBe('')
            })
        })
    })
})
