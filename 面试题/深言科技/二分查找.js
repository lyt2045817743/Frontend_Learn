// 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

// 请必须使用时间复杂度为 O(log n) 的算法。

 

// 示例 1:

// 输入: nums = [1,3,5,6], target = 5
// 输出: 2
// 示例 2:
// const nums = [1,3,5,6], target = 5;
// 输入: nums = [1,3,5,6], target = 2
// 输出: 1
// 示例 3:
// const nums = [1,3,5,6], target = 2;
// 输入: nums = [1,3,5,6], target = 7
// 输出: 4
const nums = [1,3,5,6], target = 7;

function findNum(nums, target) {
    function findNumMini(start, end) {
        const  mid = Math.floor((start + end) / 2);
        if (nums[mid] === target) {
            return mid;
        }
        if (start + 1 === end) {
            if (nums[start] > target) {
                return start - 1;
            } else {
                return start + 1;
            }
        } else if (target < nums[mid]){
            return findNumMini(start, mid);
        } else {
            return findNumMini(mid, end);
        }
    }
    return findNumMini(0, nums.length);
}

const result = findNum(nums, target);
console.log(result);