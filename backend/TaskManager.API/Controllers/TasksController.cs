using Microsoft.AspNetCore.Mvc;
using TaskManager.API.Models;

namespace TaskManager.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private static List<TaskItem> Tasks = new()
    {
        new TaskItem { Id = 1, Title = "Learn Angular", IsCompleted = false },
        new TaskItem { Id = 2, Title = "Learn .NET Web API", IsCompleted = true }
    };

    [HttpGet]
    public IActionResult GetTasks()
    {
        return Ok(Tasks);
    }

    [HttpPost]
    public IActionResult AddTask([FromBody] TaskItem task)
    {
        task.Id = Tasks.Count + 1;
        task.IsCompleted = false;

        Tasks.Add(task);

        return Ok(task);
    }
}
