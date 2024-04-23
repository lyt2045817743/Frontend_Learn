function merge(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    for (let i = 0; i < intervals.length - 1; i++) {
        const cur = intervals[i], after = intervals[i + 1];
        if (after[0] <= cur[1]) {
            intervals[i + 1] = [cur[0], Math.max(cur[1], after[1])];
            intervals.splice(i, 1);
            i--;
        }
    }
}

// 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
 
// 示例 1：
// 输入：intervals = [[2,6],[1,3],[8,10],[15,18]]
// 输出：[[1,6],[8,10],[15,18]]
// 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
const intervals = [[2,6],[1,3],[8,10],[15,18]];

// 示例 2：
// 输入：intervals = [[1,4],[4,5]]
// 输出：[[1,5]]
// 解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
// const intervals = [[1,4],[4,5]];

merge(intervals);
console.log(intervals);