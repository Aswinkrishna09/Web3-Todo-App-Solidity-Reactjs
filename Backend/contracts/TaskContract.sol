// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract TaskContract {
    event AddTask(address recipient, uint256 taskId);
    event DeleteTask(uint256 taskId, bool isDeleted);
    struct Task {
        uint256 taskId;
        string taskText;
        bool isDeleted;
    }
    Task[] private tasks;
    mapping(uint256 => address) taskToOwner;

    function addTask(string memory _taskText, bool _isDeleted) external {
        uint256 taskId = tasks.length;
        tasks.push(Task(taskId, _taskText, _isDeleted));
        taskToOwner[taskId] = msg.sender;
        emit AddTask(msg.sender, taskId);
    }

    function getAllTasks() external view returns (Task[] memory) {
        Task[] memory temporary = new Task[](tasks.length);
        uint256 counter = 0;

        for (uint256 i = 0; i < tasks.length; i++) {
            if (taskToOwner[i] == msg.sender && tasks[i].isDeleted == false) {
                temporary[i] = tasks[i];
                counter++;
            }
        }

        Task[] memory results = new Task[](counter);

        for (uint256 i = 0; i < counter; i++) {
            results[i] = temporary[i];
        }
        return results;
    }

    function deleteTask(uint256 _taskId, bool _isDeleted) external {
        if (taskToOwner[_taskId] == msg.sender) {
            tasks[_taskId].isDeleted = _isDeleted;
            emit DeleteTask(_taskId, _isDeleted);
        }
    }
}
