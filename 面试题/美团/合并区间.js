/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    if (intervals.length < 2) {
        return intervals;
    }
    intervals.sort((a, b) => a[0] - b[0]);
    const result = [intervals[0]];
    for(let i = 1; i < intervals.length; i++) {
        if (result[result.length - 1][1] >= intervals[i][0]) {
            result[result.length - 1][1] = Math.max(result[result.length - 1][1], intervals[i][1]);
        } else {
            result.push(intervals[i]);
        }
    }    
    return result;
};

// 合并区间
// 给出一组区间，请合并所有重叠的区间。
// 请保证合并后的区间按区间起点升序排列。

// 数据范围：区间组数 ，区间内 的值都满足 
// 要求：空间复杂度 ，时间复杂度 
// 进阶：空间复杂度 ，时间复杂度

// 示例 1
// 输入 [[10,30],[20,60],[80,100],[150,180]]
// 输出 [[10,60],[80,100],[150,180]]
// const intervals = [[10,30],[20,60],[80,100],[150,180]];

// 示例 2
// 输入 [[0,10],[10,20]]
// 输出 [[0,20]]
// const intervals = [[0,10],[10,20]];

// 实例 3

const result = merge(intervals);
console.log(result);