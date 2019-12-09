const loopLinkedList = (head) => {
  for(let tmp = head;tmp != null;) {
    //console.log(tmp.val, '.........');
    tmp = tmp.next; 
  }
    console.log('......... Loop linked list .........');
}

//static int maxSubArraySum(int a[]) 
//{ 
  //int size = a.length; 
  //int max_so_far = Integer.MIN_VALUE, max_ending_here = 0; 

  //for (int i = 0; i < size; i++) 
  //{ 
    //max_ending_here = max_ending_here + a[i]; 
    //if (max_so_far < max_ending_here) 
      //max_so_far = max_ending_here; 
    //if (max_ending_here < 0) 
      //max_ending_here = 0; 
  //} 
  //return max_so_far; 
//} 
//
//
//[-1,0,1,2,-1,-4] 0
// Hash table
//Run a loop from i=0 to n-2
//Create an empty hash table
//Run inner loop from j=i+1 to n-1
  //If -(arr[i] + arr[j]) is present in hash table
//print arr[i], arr[j] and -(arr[i]+arr[j])
  //Else
  //Insert arr[j] in hash table.
//[-1,0,2,1,2,-1,-4] 1

//const diff = arr[i] < 0 ? arr[i] + target : -(arr[i] + target)

  //[
    //[-1, 0, 1],
    //[-1, -1, 2]
  //]

//1. Sort all element of array
//2. Run loop from i=0 to n-2.
  //Initialize two index variables l=i+1 and r=n-1
//4. while (l < r) 
  //Check sum of arr[i], arr[l], arr[r] is
  //zero or not if sum is zero then print the
  //triplet and do l++ and r--.
  //5. If sum is less than zero then l++
  //6. If sum is greater than zero then r--
  //7. If not exist in array then print not found.

//Problem: Product of Array Except Self
//Given an array nums of n integers where n > 1, return an array output such that output[i] is equal to the product of all the elements of nums except nums[i].
//Note: Please solve it without division and in O(n).
//Example:
//Input:  [1,2,3,4]
//Output: [24,12,8,6]
//1. Find mid value and break the array into two parts
//2. Create 2 arrays left, and right
//3. For left array, each cell is the multiplcation from it's left element
//3. For right array, each cell is the multiplcation from it's right element
const productArrayExceptSelf = (array) => {
  let left = [];
  let right = [];
  // Left
  for(let i = 0; i < array.length; i++) {
    if(i === 0) {
      left[i] = 1;
    } else {
      left[i] = left[i-1] * array[i-1];
    }
  }
  // Right
  for(let i = array.length-1; i >= 0; i--) {
    if(i === array.length-1) {
      right[i] = 1;
    } else {
      right[i] = right[i+1] * array[i+1];
    }
  }
  let answer = [];
  for(let i = 0; i < array.length; i++) {
    answer.push(left[i]*right[i]); 
  }
  return answer;
}
console.log(productArrayExceptSelf([1,2,3,4]) === [24,12,8,6] ? 'pass' : 'fail', 'productArrayExceptSelf([1,2,3,4])')

//Problem: Best time to buy and sell stocks
//Example 1:
//Input: [7,1,5,3,6,4]
//Output: 5
//Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
//Not 7-1 = 6, as selling price needs to be larger than buying price.
//Example 2:
//Input: [7,6,4,3,1]
//Output: 0
//Explanation: In this case, no transaction is done, i.e. max profit = 0.
const bestTimeBuySellStock = (stocks) => {
  if(stocks.length < 2) {
    return 0; 
  }
  let min = stocks[0];
  let profit = 0;
  for(let i = 1; i < stocks.length; i++) {
    if(stocks[i] < min) {
      min = stocks[i];
    } else {
      if(stocks[i] - min > profit) {
        profit = stocks[i] - min; 
      }
    }
  }
  return profit;
}

console.log(bestTimeBuySellStock([7,1,5,3,6,4]) === 5 ? 'pass' : 'fail', 'bestTimeBuySellStock([7,1,5,3,6,4])')
console.log(bestTimeBuySellStock([7,6,4,3,1]) === 0 ? 'pass' : 'fail', 'bestTimeBuySellStock([7,6,4,3,1])')

//Problem: Maximum sub array:
//Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.
//Example:
//Input: [-2,1,-3,4,-1,2,1,-5,4],
  //Output: 6
  //Explanation: [4,-1,2,1] has the largest sum = 6.
  //Follow up:
  //If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

// Kadane requires at least one positive integers
const maximumSubArray = (nums) => {
  let currentSum = Number.MIN_VALUE;
  let bestSum = 0;
  for(let i = 0; i < nums.length; i++) {
    currentSum = Math.max(0, currentSum+nums[i]);
    bestSum = Math.max(currentSum, bestSum)
  }
  return bestSum;
}
console.log(maximumSubArray([-2,1,-3,4,-1,2,1,-5,4]) === 6 ? 'Pass' : 'fail', ': maximumSubArray([-2,1,-3,4,-1,2,1,-5,4])')
console.log(maximumSubArray([-2,-1, 2]) === 2 ? 'pass' : 'Fail', ': maximumSubArray([-2,-1, 2])')
console.log(maximumSubArray([-2, -3, 4, -1, -2, 1, 5, -4]) === 7 ? 'pass' : 'Fail', ': maximumSubArray([-2, -3, 4, -1, -2, 1, 5 -4])')

// Divide and conquer
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
const reverseList = (head) => {
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

let actualHead = [5, 4, 3, 2, 1]

const verifyList = (expected, actual) => {
  let answer = true;
  let count = 0;
  for(;expected != null;count++) {
    //console.log(expected.val);
    //console.log(actual[count]);
    answer = expected.val != actual[count] ? false : answer;
    expected = expected.next;
  }
  answer = answer && (count-1 != actual.length);
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

//LinkedList Problem: Given a linked list, determine if it has a cycle in it.
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

//LinkList problem: Merge two link lists
//Input: 1->2->4, 1->3->4
//Output: 1->1->2->3->4->4
node1 = new ListNode(1);
node2 = new ListNode(2);
node4 = new ListNode(4);
head1 = node1;
node1.next = node2;
node2.next = node4;
node4.next = null;

let sNode1 = new ListNode(1);
let sNode3 = new ListNode(3);
let sNode4 = new ListNode(4);
let sHead = sNode1;
sNode1.next = sNode3;
sNode3.next = sNode4;
sNode4.next = null;

let aHead = [1, 1, 2, 3, 4, 4]

const mergeLinkLists = (l1, l2) => {
  let p1 = l1;
  let p2 = l2;
  let head = null, tail = null;
  if(p1 === null) {
    return l2;
  }
  if(p2 === null) {
    return l1;
  }
  for(;p2 != null && p1 != null;) {
    if(p1.val < p2.val) {
      let tmp = p1;
      p1 = p1.next;
      tmp.next = null;
      if(head === null && tail === null) {
        head = tmp;
        tail = tmp; 
      } else {
        tail.next = tmp; 
        tail = tail.next
      }
    } else if(p2 !== null) {
      let tmp = p2;
      p2 = p2.next;
      tmp.next = null;
      if(head === null && tail === null) {
        head = tmp;
        tail = tmp; 
      } else {
        tail.next = tmp; 
        tail = tail.next
      }
    }
  }
  if(p1 !== null) {
    tail.next = p1;
  }
  if(p2 !== null) {
    tail.next = p2;
  }
  return head;
}

console.log(verifyList(mergeLinkLists(head1, sHead), aHead) ? 'pass' : 'fail', ': mergeLinkLists(head1, sHead)')

//LinkedList problem: Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.
//Example:
//Input:
//[
  //1->4->5,
  //1->3->4,
  //2->6
//]
//Output: 1->1->2->3->4->4->5->6

// LinkedList problem: Reorder linkedList
//Given a singly linked list L: L0→L1→…→Ln-1→Ln,
//reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…
//You may not modify the values in the list's nodes, only nodes itself may be changed.
//Example 1:
//Given 1->2->3->4, reorder it to 1->4->2->3.
//Example 2:
//Given 1->2->3->4->5, reorder it to 1->5->2->4->3.
node1 = new ListNode(1);
node2 = new ListNode(2);
node3 = new ListNode(3);
node4 = new ListNode(4);
head = node1;
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = null;

aNode1 = new ListNode(1);
aNode2 = new ListNode(2);
aNode3 = new ListNode(3);
aNode4 = new ListNode(4);
aHead = aNode1;
aNode1.next = aNode4;
aNode4.next = aNode2;
aNode2.next = aNode3;
aNode3.next = null;

node1 = new ListNode(1);
node2 = new ListNode(2);
node3 = new ListNode(3);
node4 = new ListNode(4);
node5 = new ListNode(5);
head1 = node1;
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;
node5.next = null;

let aHead1 = [1, 2, 3, 4, 5];

const reorderLinkedList = (head) => {
  if(head === null) {
    return head 
  }
  let l1 = head.next;
  if(l1 === null) {
    return head 
  }
  let tail = l1;
  for(;tail.next.next != null;) {
    tail = tail.next; 
  }
  return head;
}

console.log(verifyList(reorderLinkedList(head1), aHead1) ? 'pass' : 'fail', ': reorderLinkedList(1->2->3->4->5)')

// Array Problem: Container with most water
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
//var twoSum = function(nums, target) {
  //for(let i = 0; i < nums.length; i++){
    //for(let j = i+1; j < nums.length; j++) {
      //if(nums[i]+nums[j] === target){
        //return [i, j]
      //}
    //}
  //}
//};

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



// Sliding Window
//So the first thing you want to be able to do is to identify a problem that uses a sliding window paradigm. Luckily, there are some common giveaways:

//The problem will involve a data structure that is ordered and iterable like an array or a string

//You are looking for some subrange in that array/string, like a longest, shortest or target value.

//There is an apparent naive or brute force solution that runs in O(N²), O(2^N) or some other large time complexity.

//But the biggest giveaway is that the thing you are looking for is often some kind of optimal, like the longest sequence or shortest sequence of something that satisfies a given condition exactly.
//
// B-tree v.s. B+-tree
//https://stackoverflow.com/questions/870218/differences-between-b-trees-and-b-trees

//Problem: Maximum Product Subarray
//Given an integer array nums, find the contiguous subarray within an array (containing at least one number) which has the largest product.
//Example 1:
//Input: [2,3,-2,4]
//Output: 6
//Explanation: [2,3] has the largest product 6.
//Example 2:
//Input: [-2,0,-1]
//Output: 0
//Explanation: The result cannot be 2, because [-2,-1] is not a subarray.

//const maxProductSubArray = (nums) => {
  //let currentProduct = 1;
  //let maxProduct = Number.MIN_VALUE;
  //for(let i = 0; i < nums.length; i++) {
    //currentProduct = Math.max(1, nums[i]*currentProduct);
    //maxProduct = Math.max(currentProduct, maxProduct);
  //}
  //return maxProduct;
//}

//const maxProductSubArray = (nums, start, end) => {
  //if(nums.length === 1) {
    //return nums[0];
  //}
  //let mid = nums.length >> 1;
  //console.log(maxProductSubArray(nums, 0, (end-start+1)/2), '....')
  ////return Math.max(maxProductSubArray(nums, 0, mid-1), maxProductionCrossing(nums, mid), maxProductSubArray(nums, mid+1, nums.length-1));
//}

//const maxProductionCrossing = (nums, mid) => {
  //let leftProduct = 1;
  //let rightProduct = 1;
  //for(let i = mid-1; i >= 0; i--) {
    //leftProduct = leftProduct * nums[i] > leftProduct ? leftProduct * nums[i] : leftProduct;
  //}
  //for(let i = mid+1; i < nums.length; i++) {
    //rightProduct = rightProduct * nums[i] > rightProduct ? rightProduct * nums[i] : rightProduct;
  //}
  //return Math.max(leftProduct, leftProduct*nums[mid]*rightProduct, rightProduct)
//}

//console.log(maxProductSubArray([2,3,-2,4], 0, 3) === 6 ? 'pass' : 'fail', ': maxProductSubArray([2,3,-2,4])', maxProductSubArray([2,3,-2,4], 0, 3))
//console.log(maxProductSubArray([-2, 0, -1]) === 0 ? 'pass' : 'fail', ': maxProductSubArray([-2, 0, -1])', maxProductSubArray([-2, 0, -1]))
//console.log(maxProductSubArray([6, -3, -10, 0, 2]) === 180 ? 'pass' : 'fail', ': maxProductSubArray([6, -3, -10, 0, 2])', maxProductSubArray([6, -3, -10, 0, 2]))
//console.log(maxProductSubArray([-1, -3, -10, 0, 60]) === 60 ? 'pass' : 'fail', ': maxProductSubArray([-1, -3, -10, 0, 60])', maxProductSubArray([-1, -3, -10, 0, 60]))
//console.log(maxProductSubArray([-2, -3, 0, -2, -40]) === 80 ? 'pass' : 'fail', ': maxProductSubArray([-2, -3, 0, -2, -40])', maxProductSubArray([-2, -3, 0, -2, -40]))

//LinkedList problem: Middle of LinkedList
//Given a non-empty, singly linked list with head node head, return a middle node of linked list.
//If there are two middle nodes, return the second middle node.
// Example 1:
// Input: [1,2,3,4,5]
// Output: Node 3 from this list (Serialization: [3,4,5])
// The returned node has value 3.  (The judge's serialization of this node is [3,4,5]).
// Note that we returned a ListNode object ans, such that:
// ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, and ans.next.next.next = NULL.
// Example 2:
// Input: [1,2,3,4,5,6]
// Output: Node 4 from this list (Serialization: [4,5,6])
// Since the list has two middle nodes with values 3 and 4, we return the second one.
// Tips: slow/fast pointers
// https://leetcode.com/problems/middle-of-the-linked-list/solution/
const middleLinkedList = (nums) => {
  let size = 0;
  for(let i = nums; i != null;size++) {
    i = i.next; 
  }
  const middleIndex = size >> 1;
  let ptr = nums;
  for(let i = 0; i < middleIndex; i++ ) {
    ptr = ptr.next
  }
  return ptr;
}

node1 = new ListNode(1);
node2 = new ListNode(2);
node3 = new ListNode(3);
node4 = new ListNode(4);
node5 = new ListNode(5);
node6 = new ListNode(6);
head = node1;
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;
node5.next = node6;
console.log(middleLinkedList(head).val === 4, ': middleLinkedList(1->2->3->4->5->6)')

// LinkedList problem: Delete a node in linked list
//Input: head = [4,5,1,9], node = 5
//Output: [4,1,9]
//Example 2:
//Input: head = [4,5,1,9], node = 1
//Output: [4,5,9]
//Explanation: You are given the third node with value 1, the linked list should become 4 -> 5 -> 9 after calling your function.
node1 = new ListNode(1);
node11 = new ListNode(1);
node2 = new ListNode(2);
node3 = new ListNode(3);
node33 = new ListNode(3);
node4 = new ListNode(4);
node44 = new ListNode(4);
node444 = new ListNode(4);
node5 = new ListNode(5);
head = node1;
node1.next = node11;
node11.next = node2;
node2.next = node3;
node3.next = node33;
node33.next = node4;
node4.next = node44;
node44.next = node444;
node444.next = node5;
node5.next = null;
actualHead = [1,2,3,4,5]

node1 = new ListNode(1);
node11 = new ListNode(1);
node111 = new ListNode(1);
head = node1;
node1.next = node11;
node11.next = node111;
node111.next = null;
const deleteDuplicatesNode = (head) => {
  for(let tmp = head;tmp != null;) {
    if(tmp.next && (tmp.val === tmp.next.val)) {
      tmp.next = tmp.next.next;
    } else {
      tmp = tmp.next
    }
  }
  return head;
}
console.log(verifyList(deleteDuplicatesNode(head), actualHead) ? 'pass':'fail', ': deleteDuplicatesNode(1->1->2->3->3->4->4->4->5)')

actualHead = [1]
node1 = new ListNode(1);
node11 = new ListNode(1);
node111 = new ListNode(1);
head = node1;
node1.next = node11;
node11.next = node111;
node111.next = null;
console.log(verifyList(deleteDuplicatesNode(head), actualHead) ? 'pass':'fail', ': deleteDuplicatesNode(1->1->1)')

//LinkedList problem: Given a singly linked list, determine if it is a palindrome.
//Example 1:
//Input: 1->2
//Output: false
//Example 2:
//Input: 1->2->2->1
//Output: true
const linkedListPalindrome = (head) => {

}

//LinkedList problem: Write a program to find the node at which the intersection of two singly linked lists begins.
//For example, the following two linked lists:
//Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
//Output: Reference of the node with value = 8
//Input Explanation: The intersected node's value is 8 (note that this must not be 0 if the two lists intersect). From the head of A, it reads as [4,1,8,4,5]. From the head of B, it reads as [5,0,1,8,4,5]. There are 2 nodes before the intersected node in A; There are 3 nodes before the intersected node in B.

// Array problem: Find all tuples that are equal/closest to the target
// [-1, 3, 8, 2, 9, 5]
// [4, 1, 2, 10, 5, 20]
// target: 24
const findTargetTuple = () => {

}

// Array problem: Find minimum path for coordinates
//Input: points = [[1,1],[3,4],[-1,0]]
//Output: 7
//Explanation: One optimal path is [1,1] -> [2,2] -> [3,3] -> [3,4] -> [2,3] -> [1,2] -> [0,1] -> [-1,0]   
//Time from [1,1] to [3,4] = 3 seconds 
//Time from [3,4] to [-1,0] = 4 seconds
//Total time = 7 seconds
const findMinSumCoordinates = (coordinates) => {
  if(coordinates.length === 1) {
    return 0 
  }
  let minDist = 0;
  for(let i = 0; i < coordinates.length-1; i++) {
    let ptr = coordinates[i];
    let nextPtr = coordinates[i+1];
    let x = Math.abs(ptr[0] - nextPtr[0]);
    let y = Math.abs(ptr[1] - nextPtr[1]);
    let diagDist = Math.min(x, y);
    let straightDist = x > y ? x - diagDist : y - diagDist;
    minDist += (diagDist+straightDist);
  }
  return minDist;
}

//Array problem: Cells with Odd Values in a Matrix. Given n and m which are the dimensions of a matrix initialized by zeros and given an array indices where indices[i] = [ri, ci]. For each pair of [ri, ci] you have to increment all cells in row ri and column ci by 1.
//Return the number of cells with odd values in the matrix after applying the increment to all indices.
//Example 1:
//Input: n = 2, m = 3, indices = [[0,1],[1,1]]
//Output: 6
//Explanation: Initial matrix = [[0,0,0],[0,0,0]].
//After applying first increment it becomes [[1,2,1],[0,1,0]].
//The final matrix will be [[1,3,1],[1,3,1]] which contains 6 odd numbers.
//Example 2:
//Input: n = 2, m = 2, indices = [[1,1],[0,0]]
//Output: 0
const oddValuesCells = (r, c, indices) => {
  let matrix = [];
  for(let i = 0;i < r;i++) {
    let colums = [];
    for(let j = 0;j < c;j++) {
      colums.push(0)
    }
    matrix.push(colums);
  }
  indices.forEach(index => {
    const row = index[0];
    const col = index[1];
    matrix[row] = matrix[row].map(val => val=val+1);
    matrix.forEach(eachRow => eachRow[col]++)
  });
  let oddNum = 0;
  matrix.forEach(row => {
    row.forEach(col => {
      if(col % 2 != 0) {
        oddNum++ 
      }
    }) 
  })
  return oddNum;
}

console.log(oddValuesCells(2, 3, [[0,1],[1,1]]) === 6 ? 'pass' : 'fail', 'oddValuesCells(2, 3, [[0,1],[1,1]])')
console.log(oddValuesCells(2, 2, [[1,1],[0,0]]) === 0 ? 'pass' : 'fail', 'oddValuesCells(2, 2, [[1, 1], [0, 0]])')

// Number problem: Given a number. find next highest number with same digits
// e.g. 1234 => 1243, 4132 => 4213, 4321 => none
const nextHigherNumber = (num) => {
  const numStr = num.toString();
  let numList = [];
  for(let i = 0; i < numStr.length; i++) {
    numList[i] = Number(numStr[i]);
  }
  for(let i = numList.length - 1; i > 0; i--) {
    for(let j = i-1; j >= 0; j--) {
      if(numList[i] > numList[j]) {
        let tmp = numStr[i];
        numList[i] = numList[j];
        numList[j] = tmp;
        let rightList = numList.slice(j+1).sort();
        return [...numList.slice(0, j+1), ...rightList].join('')
      }
    }
  }
  return undefined;
}
console.log(nextHigherNumber(1234) === '1243' ? 'pass' : 'fail', ': nextHigherNumber(1234)')
console.log(nextHigherNumber(4132) === '4213' ? 'pass' : 'fail', ': nextHigherNumber(4132)')
console.log(nextHigherNumber(4231) === '4312' ? 'pass' : 'fail', ': nextHigherNumber(4231)')
console.log(nextHigherNumber(32876) === '36278' ? 'pass' : 'fail', ': nextHigherNumber(32876)')
console.log(nextHigherNumber(32841) === '34128' ? 'pass' : 'fail', ': nextHigherNumber(32841)')
console.log(nextHigherNumber(4321) === undefined ? 'pass' : 'fail', ': nextHigherNumber(4321)')

//String problem: Find longest substring with 'm' unique characters in a given string
//input: karappa
//output: 4 (appa) for 2 unique characters
//output: 5 (arapp) for 3 unique characters
const findLongSubstrUniqueChars = (str, target) => {
  let slow = 0;
  let fast = 0;
  let uniqueChars = {};
  let length = 0;
  for(let i = 0;i < str.length;i++) {
    if(!uniqueChars[str[i]]) {
      uniqueChars[str[fi]] = true;
    }
    fast = i + 1;
    for(;fast < str.length;fast++) {
      if(!uniqueChars[str[fast]]) {
        uniqueChars[str[fast]] = true;
        length = fast - slow + 1;
        break;
      }
    }
  }
}

//Array problem: Maximize number of 0s by flipping a subarray
//Given a binary array, find the maximum number zeros in an array with one flip of a subarray allowed. A flip operation switches all 0s to 1s and 1s to 0s.
//Input :  arr[] = {0, 1, 0, 0, 1, 1, 0}
//Input :  arr[] = {-1, 1, -1, -1, 1, 1, -1}
//Output : 6
//We can get 6 zeros by flipping the subarray {1, 1}
//Input :  arr[] = {0, 0, 0, 1, 0, 1}
//Output : 5
// Brut force: Find all consecutive 1's in subarray, Time O(n*2), Space O(1)
// Sliding window: Time O(n*2), Space O(1)
//This problem can be reduced to largest subarray sum problem. The idea is to consider every 0 as -1 and every 1 as 1, find the sum of largest subarray sum in this modified array. This sum is our required max_diff ( count of 0s – count of 1s in any subarray). Finally we return the max_diff plus count of zeros in original array.
const maxZerosByFlippingSubArray = (nums) => {
  let currMax = 0;
  let maxDiff = 0;
  let zeros = 0;
  for(let i = 0; i < nums.length;i++) {
    if (nums[i] == 0) {
      zeros++; 
    }
    const val = (nums[i] == 1)? 1 : -1; 
    currMax = Math.max(val, val+currMax);
    maxDiff = Math.max(maxDiff, currMax);
  }
  maxDiff = Math.max(maxDiff, 0);
  return zeros+maxDiff
}
console.log(maxZerosByFlippingSubArray([0,1,0,0,1,1,0]) === 6 ? 'pass':'fail', ': maxZerosByFlippingSubArray([0,1,0,0,1,1,0])')
console.log(maxZerosByFlippingSubArray([0,0,0,1,0,1]) === 5 ? 'pass':'fail', ': maxZerosByFlippingSubArray([0,0,0,1,0,1])')

//String problem: Find All Anagrams in a String
//Input:
//s: "cbaebabacd" p: "abc"
//Output:
//[0, 6]
//
//Explanation:
//The substring with start index = 0 is "cba", which is an anagram of "abc".
//The substring with start index = 6 is "bac", which is an anagram of "abc".
//Input:
//s: "abab" p: "ab"
//Output:
//[0, 1, 2]
//
//Explanation:
//The substring with start index = 0 is "ab", which is an anagram of "ab".
//The substring with start index = 1 is "ba", which is an anagram of "ab".
//The substring with start index = 2 is "ab", which is an anagram of "ab".
const AnagramString = (s, t) => {
  let hash = {};
  let missing = 0;
  for(let i = 0; i < t.length; i++) {
    hash[t[i]] = 0;
    missing++;
  }
  let fast = 0;
  let slow = 0;
  let ans = []
  // Fast index
  for(; fast < s.length; fast++) {
    if(s[fast] in hash) {
      // Check if it's initial value
      if(hash[s[fast]] === 0) {
        missing--; 
      }
      hash[s[fast]]++;
    }
    // Shrink window
    while(missing === 0) {
      if(s[slow] in hash) {
        hash[s[slow]]--;
        if(hash[s[slow]] === 0) {
          ans.push(slow);
          missing++;
        }
      }
      slow++;
    }
  }
  return ans;
}

const compareArray = (assert, expect) => {
  for(let i = 0; i < expect.length; i++) {
    if(assert[i] != expect[i]) {
      return false; 
    }
  }
  return true;
}

console.log(compareArray(AnagramString('cbaebabacd', 'abc'), [0, 6]) ? 'pass':'fail', ': AnagramString(\'cbaebabacd\', \'abc\')')
console.log(compareArray(AnagramString('abab', 'ab'), [0, 1, 2]) ? 'pass':'fail', ': AnagramString(\'abab\', \'ab\')')
