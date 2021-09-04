Attribute VB_Name = "Module1"

Sub Xls_to_Xlsx()

    Dim Path As String
    Dim File As String
    Dim wb As Workbook
    
    Path = "G:\ATLANTA\ATLRFI\Freeman\Freeman R Prep\data\orig\"
    File = Dir(Path & "*.xls")
    
    Do While File <> ""
        If Right(File, 3) = "xls" Then
            Set wb = Workbooks.Open(FileName:=Path & File)
            wb.SaveAs FileName:=Path & File & "x", _
                FileFormat:=xlOpenXMLWorkbook
            wb.Close SaveChanges:=False
        End If
        File = Dir
    Loop
    
End Sub

