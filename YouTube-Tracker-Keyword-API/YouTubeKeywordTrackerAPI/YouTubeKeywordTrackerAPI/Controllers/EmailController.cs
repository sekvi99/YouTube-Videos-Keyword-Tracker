﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YouTubeKeywordTrackerAPI.Models.Email;
using YouTubeKeywordTrackerAPI.Services.Interfaces.Email;

namespace YouTubeKeywordTrackerAPI.Controllers;

[Route("api/[controller]")]
[Authorize]
[ApiController]
public class EmailController : ControllerBase
{
    private readonly IEmailService _emailService;
    public EmailController(IEmailService emailService)
    {
        _emailService = emailService;
    }
    [HttpPost]
    public async Task<ActionResult> SendEmail([FromBody] EmailRequestDto mail)
    {
        var result = await _emailService.SendEmail(mail);

        if (result == false)
        {
            return StatusCode(500, new { error = "Mail Service Error" });
        }

        return Ok();
    }
    [HttpPost("{reportFileId}")]
    public async Task<ActionResult> SendEmailWithReport([FromBody] EmailRequestDto mail, int reportFileId)
    {
        var result = await _emailService.SendEmailWithReportAsync(mail, reportFileId);
        
        if (result == false)
        {
            return StatusCode(500, new { error = "Something went wrong, can't send mail with report file" });
        }

        return Ok();
    }
}
