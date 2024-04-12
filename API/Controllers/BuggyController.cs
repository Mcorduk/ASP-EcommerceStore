
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        [HttpGet("notfound")]
        public ActionResult<string> GetNotFound()
        {
            return NotFound();
        }
        [HttpGet("badrequest")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest();
        }

        [HttpGet("unauthorized")]
        public ActionResult<string> GetUnauthorized()
        {
            return Unauthorized();
        }

        [HttpGet("servererror")]
        public ActionResult<string> GetServerError()
        {
            return StatusCode(500, "This is a server error");
        }

        [HttpGet("validationerror")]
        public ActionResult<string> GetValidationError()
        {
            ModelState.AddModelError("username", "Required");
            ModelState.AddModelError("password", "Required");
            ModelState.AddModelError("Similar Problem", "Description of the problem");
            return ValidationProblem();
        }
    }
}