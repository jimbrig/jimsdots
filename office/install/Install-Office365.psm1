<#
	.SYNOPSIS
	Download Office 2019 or 365
	.PARAMETER Branch
	Choose Office branch: 2019 or 365
	.PARAMETER Channel
	Choose Office channel: Current, SemiAnnual, or InsiderFast
	.PARAMETER Components
	Choose Office components: Access, OneDrive, Outlook, Word, Excel, PowerPoint, Teams
	.EXAMPLE
	# Download Office 2019 with the Word, Excel, PowerPoint components
	Install-Office365 -Branch 2019 -Channel Current -Components Word, Excel, PowerPoint
	.EXAMPLE
	# Download Office 365 with the Word, Excel, PowerPoint components
	Install-Office365 -Branch 365 -Channel SemiAnnual -Components Word, Excel, PowerPoint
	.LINK
	https://config.office.com/deploymentsettings
	.LINK
	https://www.microsoft.com/en-us/download/details.aspx?id=49117
	.LINK
	https://github.com/jimscratch/Office/blob/master/Office.ps1
#>
function Install-Office365
{
	[CmdletBinding()]
	param
	(
		[Parameter(Mandatory = $true)]
		[ValidateSet("2019", "365")]
		[string]
		$Branch,

		[Parameter(Mandatory = $true)]
		[ValidateSet("Current", "SemiAnnual", "InsiderFast")]
		[string]
		$Channel,

		[Parameter(Mandatory = $true)]
		[ValidateSet("Access", "OneDrive", "Outlook", "Word", "Excel", "PowerPoint", "Teams")]
		[string[]]
		$Components
	)

	if (-not (Test-Path -Path "$PWD\Config.xml"))
	{
		Write-Warning -Message "XML Configuration File Config.xml doesn't exist in directory: $PWD."
		exit
	}

	[xml]$Config = Get-Content -Path "$PWD\Config.xml" -Encoding Default -Force

	switch ($Branch)
	{
		2019
		{
			($Config.Configuration.Add.Product | Where-Object -FilterScript {$_.ID -eq ""}).ID = "Standard2019Retail"
		}
		365
		{
			($Config.Configuration.Add.Product | Where-Object -FilterScript {$_.ID -eq ""}).ID = "O365ProPlusRetail"
		}
	}

	switch ($Channel)
	{
		Current
		{
			($Config.Configuration.Add | Where-Object -FilterScript {$_.Channel -eq ""}).Channel = "Current"
			($Config.Configuration.Add.Updates | Where-Object -FilterScript {$_.Channel -eq ""}).Channel = "Current"
		}
		SemiAnnual
		{
			($Config.Configuration.Add | Where-Object -FilterScript {$_.Channel -eq ""}).Channel = "SemiAnnual"
			($Config.Configuration.Add.Updates | Where-Object -FilterScript {$_.Channel -eq ""}).Channel = "SemiAnnual"
		}
		InsiderFast
		{
			($Config.Configuration.Add | Where-Object -FilterScript {$_.Channel -eq ""}).Channel = "InsiderFast"
			($Config.Configuration.Add.Updates | Where-Object -FilterScript {$_.Channel -eq ""}).Channel = "InsiderFast"
		}
	}

	foreach ($Component in $Components)
	{
		switch ($Component)
		{
			Access
			{
				$Node = $Config.SelectSingleNode("//ExcludeApp[@ID='Access']")
				$Node.ParentNode.RemoveChild($Node)
			}
			Excel
			{
				$Node = $Config.SelectSingleNode("//ExcludeApp[@ID='Excel']")
				$Node.ParentNode.RemoveChild($Node)
			}
			OneDrive
			{
				$Node = $Config.SelectSingleNode("//ExcludeApp[@ID='OneDrive']")
				$Node.ParentNode.RemoveChild($Node)
			}
			Outlook
			{
				$Node = $Config.SelectSingleNode("//ExcludeApp[@ID='Outlook']")
				$Node.ParentNode.RemoveChild($Node)
			}
			Word
			{
				$Node = $Config.SelectSingleNode("//ExcludeApp[@ID='Word']")
				$Node.ParentNode.RemoveChild($Node)
			}
			PowerPoint
			{
				$Node = $Config.SelectSingleNode("//ExcludeApp[@ID='PowerPoint']")
				$Node.ParentNode.RemoveChild($Node)
			}
			Teams
			{
				$Node = $Config.SelectSingleNode("//ExcludeApp[@ID='Teams']")
				$Node.ParentNode.RemoveChild($Node)
			}
		}
	}

	$Config.Save("$PWD\Configuration.xml")

	# Download Office Deployement Tool
	# https://www.microsoft.com/en-us/download/details.aspx?id=49117
	[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

	$Parameters = @{
		Uri             = "https://www.microsoft.com/en-us/download/confirmation.aspx?id=49117"
		UseBasicParsing = $true
		Verbose         = $true
	}
	$ODTURL = ((Invoke-WebRequest @Parameters).Links | Where-Object {$_.outerHTML -like "*click here to download manually*"}).href
	$Parameters = @{
		Uri             = $ODTURL
		OutFile         = "$PWD\officedeploymenttool.exe"
		UseBasicParsing = $true
		Verbose         = $true
	}
	Invoke-WebRequest @Parameters

	# Expand officedeploymenttool.exe
	Start-Process "$PWD\officedeploymenttool.exe" -ArgumentList "/quiet /extract:`"$PWD\officedeploymenttool`"" -Wait

	$Parameters = @{
		Path        = "$PWD\officedeploymenttool\setup.exe"
		Destination = "$PWD"
		Force       = $true
	}
	Move-Item @Parameters

	Start-Sleep -Seconds 1

	Remove-item -Path "$PWD\officedeploymenttool", "$PWD\officedeploymenttool.exe"  -Recurse -Force

	# Start downloading to the Office folder
	Start-Process -FilePath "$PWD\setup.exe" -ArgumentList "/configure `"$PWD\Configuration.xml`"" -Wait
}
