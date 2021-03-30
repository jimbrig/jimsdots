Attribute VB_Name = "Main"
Private Sub Workbook_Open()

    Application.OnKey "{F1}", ""
    ActiveWindow.Close
    
End Sub

Sub enableEvents()

    Application.enableEvents = True

End Sub

Sub centerOverColumn()
Attribute centerOverColumn.VB_ProcData.VB_Invoke_Func = "X\n14"

    Selection.HorizontalAlignment = xlCenterAcrossSelection

End Sub
Sub GoToSheets()
Attribute GoToSheets.VB_ProcData.VB_Invoke_Func = "N\n14"

    Application.CommandBars("workbook tabs").ShowPopup

End Sub

Sub generalAlignment()
Attribute generalAlignment.VB_ProcData.VB_Invoke_Func = "C\n14"

    Selection.HorizontalAlignment = xlGeneral

End Sub

Public Sub hideActiveSheets()

    Dim sht As Worksheet
    
    For Each sht In ActiveWindow.SelectedSheets
    
        sht.Visible = xlSheetVeryHidden
        
    Next sht

End Sub

Sub snapShot()
Attribute snapShot.VB_ProcData.VB_Invoke_Func = "Y\n14"
'
' setupChecks Macro
' Adds rows and columns up and pastes values, then checks to see if anything has changed after modification. Used for tech review purposes.

    Application.Calculation = xlCalculationManual

    'Sets a cell equal to everything in print range
    Range("Xba2").Select
    ActiveCell.FormulaR1C1 = "=RC[-16276]"
    Range("Xba2").Copy
    
    Range("Xba2:XFD1000").Select
    ActiveSheet.Paste
    ActiveSheet.Calculate
    Selection.Copy
    
    'Pastes values of everything in print range and checks to see if two are equivalent.
    Range("Xba1002").Select
    Selection.PasteSpecial Paste:=xlPasteValues
        
    Range("Xba2002").Select
    ActiveCell.FormulaR1C1 = "=R[-1000]C=R[-2000]C"
    Range("Xba2002").Copy
    Range("Xba2002:Xfd3000").Select
    ActiveSheet.Paste
    
    
    'Counts the number of true and false values and checks to see if these change.
    
    Range("xk1").Select
    ActiveCell.FormulaR1C1 = "=COUNTIF(R[1]:R[99999],TRUE)"
    ActiveSheet.Calculate
    Selection.Copy
    
    Range("xm1").Select
    Selection.PasteSpecial Paste:=xlPasteValues

    Range("xl1").Select
    ActiveCell.FormulaR1C1 = "=COUNTIF(R[1]:R[99999],FALSE)"
    Calculate
    Selection.Copy
    
    Range("xn1").Select
    Selection.PasteSpecial Paste:=xlPasteValues
    
    Range("F1").Select
    ActiveCell.FormulaR1C1 = "=AND(RC[629]=RC[631],RC[630]=RC[632])"
    Range("R1").Select
    ActiveCell.FormulaR1C1 = "=RC[-12]"
    Range("ad1").Select
    ActiveCell.FormulaR1C1 = "=RC[-12]"
    Range("ap1").Select
    ActiveCell.FormulaR1C1 = "=RC[-12]"
    Range("bb1").Select
    ActiveCell.FormulaR1C1 = "=RC[-12]"
   
    
    'Makes the cell easier to read
    Range("f1,r1,ad1,ap1,bb1").Select
    Selection.Font.Size = 20
    Selection.Font.Color = -16776961
    Selection.Interior.Color = 65535
    Selection.Font.Bold = True
    Selection.Columns.AutoFit
    Selection.Rows.AutoFit
    
    Range("a1").Select
    
    Application.Calculation = xlCalculationAutomatic

End Sub

Sub snapShotReset()
Attribute snapShotReset.VB_ProcData.VB_Invoke_Func = "H\n14"

    'Should only be used after snapShot sub has been used.
    'This is used to re-paste the values off the the side so that check is back to true.

    Range("Xba2:XFD1000").Copy
    Range("Xba1002").PasteSpecial Paste:=xlPasteValues
    
    'Puts the active cell back to the beginning of sheet
    Range("A1").Select

End Sub

Sub changePivotAges()
Attribute changePivotAges.VB_ProcData.VB_Invoke_Func = "K\n14"

Dim PT As PivotTable
Dim PI As PivotItem
Dim startingMonth As Integer

Set PT = ActiveSheet.PivotTables(1)

startingMonth = InputBox(Prompt:="Starting Month:", _
          Title:="Starting Triangle Age", Default:="Enter Starting Triangle Age")


        With PT.PivotFields("Elapsed Months")
            For Each PI In .PivotItems
                If PI = "00-2" Or PI = "00-5" Then
                    PI.Visible = False
                ElseIf PI.Value Mod 12 = startingMonth Mod 12 Then
                    PI.Visible = True
                Else: PI.Visible = False
                
                End If
        Next PI
        End With
        
    
End Sub

Sub UpdateRNATrianglePivots()
Attribute UpdateRNATrianglePivots.VB_ProcData.VB_Invoke_Func = "J\n14"
'
    With ActiveSheet.PivotTables(1).PivotFields("SPH ACTUARIAL ENTITY")
        .PivotItems("RNA Franchise").Visible = True
        .PivotItems("STAFFING").Visible = True
        .PivotItems("OWNERS").Visible = False
    End With
    
    ActiveSheet.PivotTables(1).PivotFields("SPH TRI STATE"). _
        CurrentPage = "All Other"
    Range("A9").Select
    Range(Selection, Selection.End(xlDown)).Select
    Range(Selection, Selection.End(xlToRight)).Select
    
    Application.CutCopyMode = False
    Selection.Copy
    
    Range("A39").Select
    ActiveSheet.Paste
    
    ActiveSheet.PivotTables(1).PivotFields("SPH TRI STATE"). _
        CurrentPage = "California"
    Range("A9").Select
    Range(Selection, Selection.End(xlDown)).Select
    Range(Selection, Selection.End(xlToRight)).Select
    
    Application.CutCopyMode = False
    Selection.Copy
    
    Range("A69").Select
    ActiveSheet.Paste
    
    ActiveSheet.PivotTables(1).PivotFields("SPH TRI STATE").CurrentPage = "(All)"
    ActiveSheet.Range("A1").Activate

End Sub
Sub RefreshZoomForTech()
Attribute RefreshZoomForTech.VB_ProcData.VB_Invoke_Func = "I\n14"

    Dim ws As Worksheet
    Dim targetZoom As Integer
    Dim currentWS As Worksheet
    
    Set currentWS = ActiveSheet

        targetZoom = InputBox(Prompt:="Target Zoom:", _
            Title:="Target Zoom", Default:="Enter Desired Zoom")
            
    Application.Calculation = xlCalculationManual
            
    For Each ws In Worksheets
    
         If ws.Visible = xlSheetHidden Or ws.Visible = xlSheetVeryHidden Then GoTo Line1
        
         ws.Select
         ActiveWindow.View = xlNormalView
         ActiveWindow.Zoom = targetZoom
         ws.Rows("2:2").Select
         ActiveWindow.FreezePanes = True
         
         Range("F1,R1,AD1,AP1,BB1").Select
         Selection.Columns.AutoFit
         Selection.Rows.AutoFit
         
         ws.Range("a1").Activate
   
Line1:    Next ws
    
    Application.Calculation = xlCalculationAutomatic
    currentWS.Activate

End Sub

Sub RefreshZoom()
Attribute RefreshZoom.VB_ProcData.VB_Invoke_Func = "U\n14"

    Dim ws As Worksheet
    Dim targetZoom As Integer

        targetZoom = InputBox(Prompt:="Target Zoom:", _
            Title:="Target Zoom", Default:="Enter Desired Zoom")
            
    Application.Calculation = xlCalculationManual
            
    For Each ws In Worksheets
           
        If ws.Visible = xlSheetHidden Or ws.Visible = xlVeryHidden Then GoTo Line2
           
            ws.Select
            ActiveWindow.View = xlNormalView
            ActiveWindow.Zoom = targetZoom
            ws.Range("a1").Activate
               
Line2:    Next ws

    ActiveWorkbook.Worksheets(1).Activate
    Application.Calculation = xlCalculationAutomatic

End Sub
Sub unhideSheets()

Dim sheets As Worksheet

    For Each sheets In Worksheets
        sheets.Visible = xlSheetVisible
    Next

End Sub

Sub hideSheets()

Dim sheets As Worksheet
Dim current As Worksheet

    Set current = ActiveWorkbook.ActiveSheet
    
    For Each sheets In Worksheets
        If sheets.Name <> current.Name Then
            sheets.Visible = xlSheetVeryHidden
        End If
    Next

End Sub

Sub FitComments()
Attribute FitComments.VB_ProcData.VB_Invoke_Func = "L\n14"


Dim xComment As Comment

    For Each xComment In Application.ActiveSheet.Comments
        xComment.Shape.TextFrame.AutoSize = True
    Next
    
End Sub

Sub TRWFormat()

    Cells.Select
    Selection.Columns.AutoFit
    Range("A1").Select
    
End Sub

Sub blackAndWhite()

Dim sheet As Worksheet

For Each sheet In Worksheets

sheet.PageSetup.blackAndWhite = True

Next sheet

End Sub

Function IsInArray(stringToBeFound As String, arr As Variant) As Boolean
  IsInArray = (UBound(Filter(arr, stringToBeFound)) > -1)
End Function
Sub vaCasualtyTargetFund()

Dim targetFunding As Integer
Dim targetRow As Integer
Dim targetSheets As Variant

'List the code name of sheets with target funding calculations
targetSheets = Array("sheet11", "sheet15", "sheet20", "sheet25", "sheet31", "sheet33", "sheet48")

For Each sht In ActiveWorkbook.Worksheets
        
    sht.Activate
    Select Case sht.CodeName
    
    'MPL
    Case "Sheet11"
        targetRow = 35
        targetFunding = 6000
    'AL
    Case "Sheet15"
        targetRow = 35
        targetFunding = 5000
    'GL
    Case 20
        targetRow = 36
        targetFunding = 10000
    'COL
    Case 25
        targetRow = 35
        targetFunding = 3000
    'PRBM
    Case 31
        targetRow = 36
        targetFunding = 10000
    'STBOND & LEBOND
    Case 33, 48
        targetRow = 35
        targetFunding = 500
        
    Case Else
        GoTo Line1
    
    End Select
          
        Range("H" & targetRow).GoalSeek goal:=targetFunding, Changingcell:=Range("H12")
        Range("I" & targetRow).GoalSeek goal:=targetFunding, Changingcell:=Range("I12")
        Range("J" & targetRow).GoalSeek goal:=targetFunding, Changingcell:=Range("J12")
        Range("K" & targetRow).GoalSeek goal:=targetFunding, Changingcell:=Range("K12")

Line1:    Next sht
        
End Sub
Sub colorChange()
Attribute colorChange.VB_ProcData.VB_Invoke_Func = "M\n14"
    
    Selection.Interior.ThemeColor = xlThemeColorLight1
    
    Selection.Font.ThemeColor = xlThemeColorDark1

End Sub

Sub changeShading()

Dim sheet As Worksheet
Dim currentSheet As Worksheet
Dim chrtObj As ChartObject
Dim targetTransparency As Double

Application.ScreenUpdating = False

Set currentSheet = ActiveSheet

        targetTransparency = InputBox(Prompt:="Enter Transparency %:", _
            Title:="Axes Shading Change", Default:="Enter a decimal from 0 to 1")

For Each sheet In ActiveWorkbook.Worksheets
    For Each chrtObj In sheet.ChartObjects
    
        chrtObj.Activate
        chrtObj.Chart.ChartArea.Border.LineStyle = xlAutomatic
    
        With ActiveChart.Axes(xlValue).MajorGridlines.Format.Line
            .ForeColor.ObjectThemeColor = msoThemeColorText1
            .Transparency = targetTransparency
        End With
        
        With ActiveChart.Axes(xlValue).Format.Line
            .ForeColor.ObjectThemeColor = msoThemeColorText1
            .Transparency = targetTransparency
        End With
        
        With ActiveChart.Axes(xlCategory).Format.Line
            .ForeColor.ObjectThemeColor = msoThemeColorText1
            .Transparency = targetTransparency
        End With
        
        If chrtObj.Chart.HasAxis(xlValue, xlSecondary) Then
            With chrtObj.Chart.Axes(xlValue, xlSecondary).Format.Line
                .ForeColor.ObjectThemeColor = msoThemeColorText1
                .Transparency = targetTransparency
            End With
        End If
    
    Next chrtObj
Next sheet

currentSheet.Activate

Application.ScreenUpdating = True

End Sub
Sub changePivotAgesTest()

Dim PT As PivotTable
Dim PI As PivotItem
Dim startingMonth As Integer

On Error GoTo ErrHandler:

For i = 1 To ActiveSheet.PivotTables.RecordCount

    Set PT = ActiveSheet.PivotTables(i)
    
    startingMonth = InputBox(Prompt:="Starting Month:", _
              Title:="Starting Triangle Age", Default:="Enter Starting Triangle Age")
    
    
            With PT.PivotFields("Elapsed Months")
                For Each PI In .PivotItems
                    If PI.Value Mod 12 = startingMonth Mod 12 Then
                        PI.Visible = True
                    Else: PI.Visible = False
                    
                    End If
Line1:            Next PI
    
    
            End With
Next i
        Exit Sub
            
ErrHandler:
PI.Visible = False
Resume Line1:
        
    
End Sub

Sub snapShotv2()
'
' setupChecks Macro
' Adds rows and columns up and pastes values, then checks to see if anything has changed after modification. Used for tech review purposes.

    Application.Calculation = xlCalculationManual

    'Sets a cell equal to everything in print range
    Range("Xba2").Select
    ActiveCell.FormulaR1C1 = "=RC[-16276]"
    Range("Xba2").Copy
    
    Range("Xba2:XFD2000").Select
    ActiveSheet.Paste
    ActiveSheet.Calculate
    Selection.Copy
    
    'Pastes values of everything in print range and checks to see if two are equivalent.
    Range("Xba2002").Select
    Selection.PasteSpecial Paste:=xlPasteValues
        
    Range("Xba4002").Select
    ActiveCell.FormulaR1C1 = "=R[-2000]C=R[-4000]C"
    Range("Xba4002").Copy
    Range("Xba4002:Xfd6000").Select
    ActiveSheet.Paste
    
    
    'Counts the number of true and false values and checks to see if these change.
    
    Range("xk1").Select
    ActiveCell.FormulaR1C1 = "=COUNTIF(R[1]:R[99999],TRUE)"
    ActiveSheet.Calculate
    Selection.Copy
    
    Range("xm1").Select
    Selection.PasteSpecial Paste:=xlPasteValues

    Range("xl1").Select
    ActiveCell.FormulaR1C1 = "=COUNTIF(R[1]:R[99999],FALSE)"
    Calculate
    Selection.Copy
    
    Range("xn1").Select
    Selection.PasteSpecial Paste:=xlPasteValues
    
    Range("F1").Select
    ActiveCell.FormulaR1C1 = "=AND(RC[629]=RC[631],RC[630]=RC[632])"
    Range("R1").Select
    ActiveCell.FormulaR1C1 = "=RC[-12]"
    Range("ad1").Select
    ActiveCell.FormulaR1C1 = "=RC[-12]"
    Range("ap1").Select
    ActiveCell.FormulaR1C1 = "=RC[-12]"
    Range("bb1").Select
    ActiveCell.FormulaR1C1 = "=RC[-12]"
   
    
    'Makes the cell easier to read
    Range("f1,r1,ad1,ap1,bb1").Select
    Selection.Font.Size = 20
    Selection.Font.Color = -16776961
    Selection.Interior.Color = 65535
    Selection.Font.Bold = True
    Selection.Columns.AutoFit
    Selection.Rows.AutoFit
    
    Range("a1").Select
    
    Application.Calculation = xlCalculationAutomatic

End Sub

Sub autoFitColumns()
Attribute autoFitColumns.VB_ProcData.VB_Invoke_Func = "T\n14"

    Selection.Columns.AutoFit
    
End Sub

Sub hardcode()

Calculate
Application.Calculation = xlCalculationManual

Dim wsh As Worksheet
Dim xComment As Comment
    
For Each wsh In Worksheets
If wsh.Visible = xlSheetHidden Or wsh.Visible = xlVeryHidden Then GoTo Line2
    wsh.Select
    
    Cells.Select
    Selection.Copy
    Selection.PasteSpecial Paste:=xlPasteValues
    
    Application.CutCopyMode = False
    
    With Selection.Interior
        .Pattern = xlNone
        .TintAndShade = 0
        .PatternTintAndShade = 0
    End With
    
    With Selection.Font
        .ColorIndex = xlAutomatic
        .TintAndShade = 0
    End With

    For Each xComment In Application.ActiveSheet.Comments
        xComment.Delete
    Next xComment
    
    Range("A1").Select
        
Line2:  Next wsh
    
Application.Calculation = xlCalculationAutomatic

End Sub

Sub columns_rows_unhide()

    Range("x:bb").ColumnWidth = 12
    Range("120:500").RowHeight = 15.8
    
End Sub

Sub ShowAllNames()
Dim n As Name
For Each n In ActiveWorkbook.Names
n.Visible = True
Next n
End Sub


