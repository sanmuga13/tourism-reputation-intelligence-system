"""
AI Management Report Generator (PDF Export).
Generates board-ready executive reports using ReportLab.
"""
from io import BytesIO
from typing import Dict, Any
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def generate_pdf_report(report_data: Dict[str, Any]) -> BytesIO:
    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )

    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontSize=22,
        leading=26,
        textColor=colors.HexColor('#1E293B'),
        fontName='Helvetica-Bold'
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontSize=11,
        leading=14,
        textColor=colors.HexColor('#64748B'),
        fontName='Helvetica'
    )

    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Normal'],
        fontSize=14,
        leading=18,
        textColor=colors.HexColor('#0F172A'),
        fontName='Helvetica-Bold',
        spaceAfter=6
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#334155'),
        fontName='Helvetica'
    )

    story = []

    # Title & Header
    entity_name = report_data.get("entity_name", "Tourism Entity")
    rep_score = report_data.get("reputation_score", 85.0)
    city = report_data.get("city", "Chennai")

    story.append(Paragraph(f"<b>TRIP</b> — Executive Reputation Intelligence Report", title_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph(f"Entity: <b>{entity_name}</b> ({city}) · Generated: {report_data.get('date', 'Today')}", subtitle_style))
    story.append(Spacer(1, 10))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#2563EB"), spaceAfter=15))

    # Executive Summary Card
    trend = report_data.get("trend", "stable").upper()
    summary_text = (
        f"<b>{entity_name}</b> currently maintains a composite reputation score of <b>{rep_score:.1f}/100</b> "
        f"with an overall <b>{trend}</b> momentum. Review sentiment indicates strong performance across "
        f"core guest touchpoints, while specific operational areas require targeted improvements."
    )
    story.append(Paragraph("1. Executive Summary", h2_style))
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 14))

    # Key Metrics Table
    story.append(Paragraph("2. Key Performance Indicators", h2_style))
    breakdown = report_data.get("breakdown", {})
    metrics_data = [
        ["Metric", "Score / Value", "Benchmark Status"],
        ["Composite Reputation", f"{rep_score:.1f} / 100", "Leader" if rep_score > 80 else "Moderate"],
        ["Sentiment Score", f"{breakdown.get('sentiment_score', 80):.1f}%", "Positive"],
        ["Review Rating Average", f"{report_data.get('avg_rating', 4.5):.1f} / 5.0", "Above Average"],
        ["Volume & Velocity", f"{breakdown.get('volume_score', 75):.1f} pts", "Active"],
        ["Recency Weighting", f"{breakdown.get('recency_score', 85):.1f} pts", "Current"]
    ]

    t_metrics = Table(metrics_data, colWidths=[200, 150, 180])
    t_metrics.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#F1F5F9')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.HexColor('#0F172A')),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E1')),
    ]))
    story.append(t_metrics)
    story.append(Spacer(1, 14))

    # Aspect Breakdown (ABSA)
    story.append(Paragraph("3. Aspect-Based Sentiment Breakdown (ABSA)", h2_style))
    aspects = report_data.get("aspects", {
        "Food": 0.94, "Staff": 0.88, "Cleanliness": 0.92,
        "Safety": 0.96, "Value": 0.85, "Location": 0.95, "Amenities": 0.82
    })
    
    aspect_table_data = [["Dimension", "Satisfaction Score", "Rating"]]
    for k, v in aspects.items():
        pct = int(v * 100) if v <= 1.0 else int(v)
        rating_desc = "Excellent" if pct >= 85 else ("Good" if pct >= 70 else "Needs Attention")
        aspect_table_data.append([k, f"{pct}%", rating_desc])

    t_aspects = Table(aspect_table_data, colWidths=[180, 170, 180])
    t_aspects.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#F8FAFC')),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#E2E8F0')),
    ]))
    story.append(t_aspects)
    story.append(Spacer(1, 14))

    # Root Cause Diagnostics & Actions
    story.append(Paragraph("4. Root Cause Diagnostics & Recommended Actions", h2_style))
    root_causes = report_data.get("root_causes", [
        {"aspect": "Staff", "cause": "Peak hour check-in queue delays", "priority": "High"},
        {"aspect": "Amenities", "cause": "AC maintenance and temperature stability", "priority": "Medium"}
    ])
    
    rc_data = [["Aspect", "Identified Root Cause", "Action Priority"]]
    for rc in root_causes:
        rc_data.append([rc.get("aspect", "-"), rc.get("cause", "-"), rc.get("priority", "Medium")])

    t_rc = Table(rc_data, colWidths=[120, 290, 120])
    t_rc.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#EFF6FF')),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#BFDBFE')),
    ]))
    story.append(t_rc)
    story.append(Spacer(1, 15))

    # Footer note
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceAfter=10))
    story.append(Paragraph("Tourism Reputation Intelligence Platform (TRIP) · Confidential Board Summary", subtitle_style))

    doc.build(story)
    buffer.seek(0)
    return buffer
