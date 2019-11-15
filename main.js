//Maximum sub array:
//Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

//Example:

//Input: [-2,1,-3,4,-1,2,1,-5,4],
  //Output: 6
  //Explanation: [4,-1,2,1] has the largest sum = 6.

  //Follow up:

  //If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

var maxSubArray = function(nums) {
  if(nums.length === 1) {
    return nums[0]
  }
  const middle = nums.length >> 1;
  const leftArray = nums.slice(0,middle);
  const rightArray = nums.slice(middle);
  return Math.max(
      maxSubArray(leftArray), 
      crossingSum(nums), 
      maxSubArray(rightArray))
};

let crossingSum = (array) => {
  let leftSum = Number.MIN_VALUE;
  let sum = 0;
  let rightSum = Number.MIN_VALUE;
  const middle = array.length >> 1;  
  for(let i = middle-1; i >= 0; i--) {
    sum = sum + array[i];
    leftSum = sum > leftSum ? sum : leftSum;
  }
  sum = 0;
  for(let j = middle+1; j < array.length; j++) {
    sum = sum + array[j];
    rightSum = sum > rightSum ? sum : rightSum;
  }
  return Math.round(leftSum + array[middle]+rightSum);
}

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]) === 6 ? 'pass' : 'fail', ': maxSubArray([-2,1,-3,4,-1,2,1,-5,4])')
console.log(maxSubArray([-2, -1]) === -1 ? 'pass' : 'fail', ': maxSubArray([-2,-1])')
console.log(maxSubArray([-1,-2,-3,0]) === 0 ? 'pass' : 'fail', ': maxSubArray([-1,-2,-3,0])')

function ListNode(val) {
  this.val = val;
  this.next = null;
}

//Reverse a singly linked list.
//Example:
//Input: 1->2->3->4->5->NULL
//Output: 5->4->3->2->1->NULL
//Follow up:
//A linked list can be reversed either iteratively or recursively. Could you implement both?

var reverseList = function(head) {
  let current = head;
  let prev = null;
  for(;current != null;) {
    let nextCurrent = current.next;
    current.next = prev;
    prev = current;
    current = nextCurrent;
  }

  return prev
};

let node1 = new ListNode(1);
let node2 = new ListNode(2);
let node3 = new ListNode(3);
let node4 = new ListNode(4);
let node5 = new ListNode(5);
let head = node1;
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;

let actualNode1 = new ListNode(1);
let actualNode2 = new ListNode(2);
let actualNode3 = new ListNode(3);
let actualNode4 = new ListNode(4);
let actualNode5 = new ListNode(5);
let actualHead = actualNode5;
actualNode5.next = actualNode4;
actualNode4.next = actualNode3;
actualNode3.next = actualNode2;
actualNode2.next = actualNode1;

const verifyList = (expected, actual) => {
  let answer = true;
  for(;expected != null;) {
    //console.log(expected.val, actual.val);
    answer = expected.val != actual.val ? false : answer;
    expected = expected.next;
    actual = actual.next;
  }
  return answer;
};

console.log(verifyList(reverseList(head), actualHead) ? 'pass' : 'fail', ': reverseList: 5->4->3->2->1')
// Recursive implementation
//public ListNode reverseList(ListNode head) {
  //if (head == null || head.next == null) return head;
  //ListNode p = reverseList(head.next);
  //head.next.next = head;
  //head.next = null;
  //return p;
//}

//Given a linked list, determine if it has a cycle in it.

//To represent a cycle in the given linked list, we use an integer pos which represents the position (0-indexed) in the linked list where tail connects to. If pos is -1, then there is no cycle in the linked list.
// Hash table: Naive implementation
// Two pointers: slow and fast. Advantage: O(1) memory
var hasCycle = function(head) {
  if(head === null || head.next === null) {
    return false;
  }
  let slow = head;
  let fast = head.next
    for(;slow != fast;){
      if(fast === null || fast.next === null) {
        return false;
      }
      slow = slow.next;
      fast = fast.next.next;
    }
  return true;
};

// Container with most water
// Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.
//
// Note: You may not slant the container and n is at least 2.
// Two pointers:
var maxArea = function(height) {
  let start = 0;
  let end = height.length - 1;
  let totalArea = 0;
  for(;start != end;) {
    if(height[start] < height[end]){
      let newArea = height[start] * (end-start);
      totalArea = newArea > totalArea ? newArea : totalArea;
    } else {
      const newArea = height[end] * (end-start);
      totalArea = newArea > totalArea ? newArea : totalArea;
    }
    if(height[start] < height[end]) {
      start = start+1;
    } else {
      end--;
    }
  }
  return totalArea
};
console.log(maxArea([1,8,6,2,5,4,8,3,7]) === 49 ? 'pass' : 'fail', ': maxArea([1,8,6,2,5,4,8,3,7])')
console.log(maxArea([1,3,2,5,25,24,5]) === 24 ? 'pass' : 'fail', ': maxArea([1,3,2,5,25,24,5])')

function MergeSort(array) {
  if(array.length === 1) {
    return array 
  }
  let middle = array.length >> 1;
  const left = array.slice(0, middle);
  const right = array.slice(middle);
  return Merge(MergeSort(left), MergeSort(right));
}

function Merge(left, right) {
  let result = [];
  for(;left.length && right.length;) {
    if(left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  if(left.length) {
    result = [...result, ...left];
  }
  if(right.length) {
    result = [...result, ...right];
  }
  return result
}

//console.log(Merge([2,7], [3,4,6]))
console.time('time');
console.log('MergeSort :')
console.log(MergeSort([3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]));
console.log([2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]);
console.timeEnd('time');
console.log();

function QuickSort(array) {
  if(array.length < 2) {
    return array 
  }
  const midIndex = array.length >> 1;
  const pivot = array[midIndex];
  let arrayWithoutPivot = [...array.splice(0, midIndex), ...array.splice(1)];
  let left = [], right = [];
  arrayWithoutPivot.forEach(val => {
    if(val <= pivot) {
      left.push(val) 
    } else {
      right.push(val) 
    }
  })
  return QuickSort(left).concat([pivot], QuickSort(right))
}

console.log('QuickSort: ', QuickSort([5, 4, 3, 2, 1]))
console.log('should be: ', [1, 2, 3, 4, 5])
console.time('time')
console.log(QuickSort([3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]));
console.log([2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]);
console.timeEnd('time')
console.log();

//[1,1,1,1,2,2,3]
//5 [1,1,2,2,3]
// Allow duplicates at most twice
//removeDuplicatesFromSortedArray
//function removeDuplicatesFromSortedArray(array) {
  //let counter = 1;
  //let j = 0;
  //for(let i = 1; i < array.length; i++) {
    //if(array[i] === array[j]) {
      //counter++; 
      //if(counter < 3) {
        //j++;
        //array[j] = array[i];
      //}
    //} else {
      //j++;
      //array[j] = array[i];
      //counter = 1;
    //} 
  //}
  //return j+1;
//}

//console.log('Remove duplicates from sorted array : ', removeDuplicatesFromSortedArray([1,1,1,1,2,2,3]) === 5 ? 'PASS' : 'FAIL');

//// TWO SUM
////Given an array of integers, find two numbers such that they add up to a specific target number. 
////The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2. Please note that your returned answers (both index1 and index2) are not zero-based.
////You may assume that each input would have exactly one solution.
////Input: numbers={2, 7, 11, 15}, target=9

//// SEARCH FOR A RANGE
//// Given a sorted array of integers, find the starting and ending position of a given target value
//// Complexity must be O(log n)
//// If the target is not found in the array, return [-1, 1]
//// Given [5, 7, 7, 8, 8, 10] and target = 8
//// Return [3, 4]

//function searchForRange() {

//}

  ////Output: index1=1, index2=2
////[1,1,2] => 2
////[1,1,2,3] => 3
////5 [1,1,2,2,3]
////function removeDuplicatesFromSortedArray(array) {
  ////let counter = 1;
  ////let j = 0;
  ////for(let i = 1; i < array.length; i++) {
    ////if(array[i] === array[j]) {
      ////if(counter < 2) {
        ////j = i;
        ////counter++; 
      ////}
    ////} else {
      ////j++;
      ////array[j] = array[i];
      ////counter = 1;
    ////} 
  ////}
  ////console.log(j, array, '.........');
  ////return j;
////}

////console.log(removeDuplicatesFromSortedArray([1,1,1,1,2,2,3]))

//// Leetcode 1191. K-Concatenation Maximum Sum
////Given an integer array arr and an integer k, modify the array by repeating it k times.
////For example, if arr = [1, 2] and k = 3 then the modified array will be [1, 2, 1, 2, 1, 2].
////Return the maximum sub-array sum in the modified array. Note that the length of the sub-array can be 0 and its sum in that case is 0.
////As the answer can be very large, return the answer modulo 10^9 + 7.
 
//// Calculating sum of sub array.
//// Consider Two cases: sum > 0 and sum < 0
//// ans = max(ans, 0)

////let ans = 0;
////for i =0; i < len {
  ////sum += array[i]
  ////if  sum < 0 return 0;
  ////ans = max(sum, 0);
  ////return ans
////}

//const maxSumArray = (array) => {
  //let sum = 0;
  //let ans = 0;
  //for(let i = 0; i < array.length; i++) {
    //sum += array[i];
    //if(sum < 0) {
      //sum = 0; 
    //}
    //ans = max([0, sum])
    //console.log(array[i], ans, sum, '...........')
  //};
  //return ans;
//};

//const max = (array) => array.reduce((acc, curr) => curr > acc ? curr : acc, 0)

//// case 1.1 If sum of array is < 0, then it's the same as K = 1 e.g. [-5,2,-1,3,-4]
//// case 1.2 If sum of array is < 0, then it's the same as K = 2 e.g. [2,-5,1,1][2,-5,1,1]
//// case 2.0 If sum of array is => 0, then it's the same as (k-2)*sum + 1.2 e.g. [-2,5,1,-3][-2,5,1,-3][-2,5,1,-3]

//function maxSum(array, k) {
  ////let k1Sum = maxSumArray(array);
  //let k2Sum = maxSumArray([...array, ...array]);
  ////let k3Sum = 0;
  ////if(k1Sum > 0) {
    ////k3Sum = k2Sum + (k - 2) * k1Sum; 
  ////}
  ////console.log(k1Sum, k2Sum, k3Sum, [...array, ...array])
  ////return max([k1Sum, k2Sum, k3Sum])
//}

//[1, -2, 1, 1, -2, 1]
////console.log('K-Concatenation Maximum Sum : ', maxSum([1,2], 3) === 9 ? 'PASS' : 'FAIL');
//console.log('K-Concatenation Maximum Sum : ', maxSum([1,-2,1], 5) === 2 ? 'PASS' : 'FAIL');
////console.log('K-Concatenation Maximum Sum : ', maxSum([-1,-2], 7) === 0 ? 'PASS' : 'FAIL');

////console.log('K-Concatenation Maximum Sum : ', maxSum([-5,2,-1,3,-4], 5) === 5 ? 'PASS' : 'FAIL');
////console.log('K-Concatenation Maximum Sum : ', maxSum([2,-5,1,1], 5) === 4 ? 'PASS' : 'FAIL');
////console.log('K-Concatenation Maximum Sum : ', maxSum([-2,5,1,-3], 7) === 12 ? 'PASS' : 'FAIL');
