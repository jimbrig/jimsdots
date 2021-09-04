Attribute VB_Name = "Module6"
Private Sub worksheet_calculate()

Dim objchrt As ChartObject
Dim chrt As Chart
    'Application.ScreenUpdating = False
    'Sheet16.ChartObjects("chart 23").Select
    
    Set objchrt = Sheet16.ChartObjects("Chart 23")
    Set chrt = objchrt.Chart
    
    If Sheet16.Range("AH10") = 1 Then
        With chrt
            .SetSourceData Source:=Sheets("PIV_Heat Maps").Range("AB38:AB45")
            .SeriesCollection(1).XValues = "='PIV_Heat Maps'!$X$39:$X$45"
            .Axes(xlValue).TickLabels.NumberFormat = "#,##0"
        End With
        
    Else
        With chrt
            .SetSourceData Source:=Sheets("PIV_Heat Maps").Range("X38:AA45")
            .SeriesCollection(1).XValues = "='PIV_Heat Maps'!$X$39:$X$45"
                .Axes(xlValue).TickLabels.NumberFormat = "#,##0.0"
            
        End With
    End If

End Sub
