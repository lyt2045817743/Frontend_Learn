// 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
// 输入：nums = [1,2,3]输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

function allResults(nums) {
    // console.log('nums', nums);
    const result = [];
    if (nums.length === 1) {
        return nums;
    } else if (nums.length === 2) {
        // console.log(nums, nums.reverse());
        return [nums, [nums[1], nums[0]]];
    }
    for (let i = 0; i < nums.length; i++) {
        const innerResult = allResults([...nums.slice(0, i), ...nums.slice(i + 1, nums.length)]);
        innerResult.forEach((item) => result.push([nums[i]].concat(item)))
    }
    return result;
}

const result = allResults([1,2,3,4, 6])
console.log(result);