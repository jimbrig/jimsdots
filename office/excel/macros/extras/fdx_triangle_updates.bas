Attribute VB_Name = "fdx_triangle_updates"
Sub updateFDXWorkbook()

    Dim sht As Worksheet
    
    sheets("e8.1").Activate
        Call updateFDXtriangles8pt1pt2pt8
    sheets("e8.2").Activate
        Call updateFDXtriangles8pt1pt2pt8
    sheets("e8.9").Activate
        Call updateFDXtriangles8pt7pt9pt11pt13pt14pt15
    sheets("e8.8").Activate
        Call updateFDXtriangles8pt1pt2pt8
        
    For Each sht In ActiveWorkbook.Worksheets
    
        sht.Activate
          
        Select Case sht.Name
        
            Case "e8.1", "e8.2", "e8.8", "e8.9"
                'Do nothing (already handled)
         
            Case "e8.3", "e8.4", "e8.5"
                Call updateFDXtriangles8pt3pt4pt5
            
            Case "e8.6", "e8.6 (2)"
                Call updateFDXtriangles8pt6
                
            Case "e8.7a", "e8.7b", "e8.7", "e8.11"
                Call updateFDXtriangles8pt7pt9pt11pt13pt14pt15
                
            Case "e8.13", "e8.14"
                Call updateFDXtriangles8pt7pt9pt11pt13pt14pt15
                Range("AC14:AH19,AC54:AH59").ClearContents
        
            Case "e8.15"
                Call updateFDXtriangles8pt7pt9pt11pt13pt14pt15
                Range("AC54:AH59").ClearContents
                            
            Case "e8.10"
                Call updateFDXtriangles8pt10
                Range("c45,c85").Calculate
                
            Case "input"
                Range("D8").FormulaR1C1 = "8/31/2017"
            
        End Select
        
    sht.Range("a1").Activate
    sht.Range("AH3:ah11").HorizontalAlignment = xlGeneral
            
    Next

End Sub

Sub updateFDXtriangles8pt1pt2pt8()
Attribute updateFDXtriangles8pt1pt2pt8.VB_ProcData.VB_Invoke_Func = " \n14"

    Range("AI:AI").EntireColumn.Insert
    Range("A46").EntireRow.Insert
    Range("a46").FormulaR1C1 = "6/01/17-5/31/18"
    Range("A82").EntireRow.Insert
    Range("A82").FormulaR1C1 = "=R[-37]C"
    ActiveSheet.PageSetup.PrintArea = "$A$1:$AI$106"
    
    Range("s3:s11").Cut
    Range("t3:t11").Select
    ActiveSheet.Paste
    
    Range("s48").Cut
    Range("t48").Select
    ActiveSheet.Paste
    
    Range("Ah1:Ah2").Cut
    Range("Ai1:Ai2").Select
    ActiveSheet.Paste
    
    Range("r1:r2").Cut
    Range("s1:s2").Select
    ActiveSheet.Paste
    
    Range("Ai12").FormulaR1C1 = "=RC[-1]+12"
    
    Range("r3:s11,r48:s48,Ag3:Ah11,Ag48:ah48").HorizontalAlignment = xlCenterAcrossSelection
    Range("ai48").HorizontalAlignment = xlGeneral
    ActiveWindow.View = xlPageBreakPreview
    Set ActiveSheet.VPageBreaks(1).Location = Range("t1")
    Range("s12:ai12,s49:ai49").Borders(xlEdgeTop).LineStyle = xlContinuous
    
    Range("C45").Copy
    Range("C46,D45,E44,F43,G42,H41,I40,J39,K38,L37,M36,N35,O34,P33,Q32,R31,S30,T29,U28,V27,W26,X25,Y24,Z23,AA22,AB21,AC20,AD19,AE18,AF17,AG16,AH15,ai14").Select
    ActiveSheet.Paste
    
    Range("C81").Copy
    Range("C82,D81,E80,F79,G78,H77,I76,J75,K74,L73,M72,N71,O70,P69,Q68,R67,S66,T65,U64,V63,W62,X61,Y60,Z59,AA58,AB57,AC56,AD55,AE54,AF53,AG52,ah51").Select
    ActiveSheet.Paste
       
'    Range("Ao82").Select
'    ActiveCell.FormulaR1C1 = _
'        "=RC[-38]*R[-1]C[-37]*R[-2]C[-36]*R[-3]C[-35]*R[-4]C[-34]*R[-5]C[-33]*R[-6]C[-32]*R[-7]C[-31]*R[-8]C[-30]*R[-9]C[-29]*R[-10]C[-28]*R[-11]C[-27]*R[-12]C[-26]*R[-13]C[-25]*R[-14]C[-24]*R[-15]C[-23]*R[-16]C[-22]*R[-17]C[-21]*R[-18]C[-20]*R[-19]C[-19]*R[-20]C[-18]*R[-21]C[-17]*R[-22]C[-16]*R[-23]C[-15]*R[-24]C[-14]*R[-25]C[-13]*R[-26]C[-12]*R[-27]C[-11]*R[-28]C[-10]*R[-29]C[-9]*" & _
'        "R[-30]C[-8]*R[-31]C[-7]"
        
'    Range("AO63:AO82").Copy
'    Range("AP63:BH82").Select
'    ActiveSheet.Paste
    
'    Range("BH58:BH82").Copy
'    Range("BI58:BM58").Select
'    ActiveSheet.Paste
        
'    Range("ap14").Copy
'    Range("AP14:BV46").Select
'    ActiveSheet.Paste
    
    Range("Ah49").Copy
    Range("Ai49").Select
    ActiveSheet.Paste
    Range("Ag49").Copy
    Range("Ah49").Select
    ActiveSheet.Paste
    
    Range("Af85:Af95").Copy
    Range("Ag85:Ah95").Select
    ActiveSheet.Paste
    
    Range("Ah14").Copy
    Range("Ai14").PasteSpecial Paste:=xlPasteFormats
    
    Range("Ah102:Ah105").Copy
    Range("Ai102:Ai105").Select
    ActiveSheet.Paste

    Range("Ag102:Ag105").Copy
    Range("Ah102:Ah105").Select
    ActiveSheet.Paste
    
'    Range("A107").EntireRow.Insert
'    Range("c107").Formula = "=c108+12"
'    Range("d107").Formula = "=$AI$105"
'    Range("c108:e108").Copy
'    Range("c107:e107").PasteSpecial Paste:=xlPasteFormats
    
End Sub
Sub updateFDXtriangles8pt3pt4pt5()

    Range("Ai:Ai").EntireColumn.Insert
    Range("A46").EntireRow.Insert
    Range("a46").FormulaR1C1 = "=e8.1!RC1"
    ActiveSheet.PageSetup.PrintArea = "$A$1:$Ai$47"
    
    Range("s3:s11").Cut
    Range("t3:t11").Select
    ActiveSheet.Paste
    
    Range("s47").Cut
    Range("t47").Select
    ActiveSheet.Paste
    
    Range("Ah1:Ah2").Cut
    Range("Ai1:Ai2").Select
    ActiveSheet.Paste
    
    Range("r1:r2").Cut
    Range("s1:s2").Select
    ActiveSheet.Paste
    
    Range("ah12").Copy
    Range("Ai12").Select
    ActiveSheet.Paste
    
    Range("r3:s11").HorizontalAlignment = xlCenterAcrossSelection
    Range("T3:Ah11").HorizontalAlignment = xlCenterAcrossSelection
    ActiveWindow.View = xlPageBreakPreview
    Set ActiveSheet.VPageBreaks(1).Location = Range("T1")
    Range("s12:ai12").Borders(xlEdgeTop).LineStyle = xlContinuous
    
    Range("C45").Copy
    Range("C46,D45,E44,F43,G42,H41,I40,J39,K38,L37,M36,N35,O34,P33,Q32,R31,S30,T29,U28,V27,W26,X25,Y24,Z23,AA22,AB21,AC20,AD19,AE18,AF17,AG16,AH15,ai14").Select
    ActiveSheet.Paste
        
    Range("AH14").Copy
    Range("AI14").PasteSpecial Paste:=xlPasteFormats


End Sub
Sub updateFDXtriangles8pt6()

    Call updateFDXtriangles8pt3pt4pt5
    
    Range("c44").Copy
    Range("C45,D44,E43,F42,G41,H40,I39,J38,K37,L36,M35,N34,O33,P32,Q31,R30,S29,T28,U27,V26,W25,X24,Y23,Z22,AA21,AB20,AC19,AD18,AE17,AF16,AG15,ai14").Select
    ActiveSheet.Paste


End Sub
Sub updateFDXtriangles8pt7pt9pt11pt13pt14pt15()

    Range("Ai:Ai").EntireColumn.Insert
    Range("A46").EntireRow.Insert
    Range("a46").FormulaR1C1 = "=e8.1!RC1"
    Range("A87").EntireRow.Insert
    Range("A87").FormulaR1C1 = "=R[-41]C"
    ActiveSheet.PageSetup.PrintArea = "$A$1:$Ai$88"
        
    Range("s3:s11").Cut
    Range("t3:t11").Select
    ActiveSheet.Paste
    
    Range("s49:s52").Cut
    Range("t49:t52").Select
    ActiveSheet.Paste
    
    Range("Ah1:Ah2").Cut
    Range("Ai1:Ai2").Select
    ActiveSheet.Paste
    
    Range("r1:r2").Cut
    Range("s1:s2").Select
    ActiveSheet.Paste
    
    Range("Ah12").Copy
    Range("ai12").Select
    ActiveSheet.Paste
    
    Range("Ah53").Copy
    Range("ai53").Select
    ActiveSheet.Paste
    
    Range("r3:s11,Ag3:Ah11,Ag49:ah52,r49:s52").HorizontalAlignment = xlCenterAcrossSelection
    ActiveWindow.View = xlPageBreakPreview
    Set ActiveSheet.VPageBreaks(1).Location = Range("T1")
    Range("s12:ai12,s53:ai53").Borders(xlEdgeTop).LineStyle = xlContinuous
    
    Range("C45").Copy
    Range("C46,D45,E44,F43,G42,H41,I40,J39,K38,L37,M36,N35,O34,P33,Q32,R31,S30,T29,U28,V27,W26,X25,Y24,Z23,AA22,AB21,AC20,AD19,AE18,AF17,AG16,AH15,ai14").Select
    ActiveSheet.Paste
    
    Range("C86").Copy
    Range("C87,D86,E85,F84,G83,H82,I81,J80,K79,L78,M77,N76,O75,P74,Q73,R72,S71,T70,U69,V68,W67,X66,Y65,Z64,AA63,AB62,AC61,AD60,AE59,AF58,AG57,AH56,ai55").Select
    ActiveSheet.Paste
    
    Range("AB:AB").Copy
    Range("AC:AC").PasteSpecial Paste:=xlPasteFormats
        
    Range("Ah14").Copy
    Range("Ai14,Ai55").PasteSpecial Paste:=xlPasteFormats

End Sub
Sub updateFDXtriangles8pt10()

    Call updateFDXtriangles8pt7pt9pt11pt13pt14pt15
    
    Range("A129").EntireRow.Insert
    Range("A129").FormulaR1C1 = "=R[-44]C"
    
    Range("s92:s95").Cut
    Range("t92:t95").Select
    ActiveSheet.Paste
    
    Range("Ah96").Copy
    Range("ai96").Select
    ActiveSheet.Paste
    
    Range("r92:s95,ag92:Ah95").HorizontalAlignment = xlCenterAcrossSelection
    ActiveWindow.View = xlPageBreakPreview
    Range("c96:ai96").Borders(xlEdgeTop).LineStyle = xlContinuous
    
    Range("C98").Copy
    Range("c98:AC130").Select
    ActiveSheet.Paste
    
    Range("AD14:Ai19,Ad55:Ai60,Ad98:Ai103").ClearContents

End Sub

