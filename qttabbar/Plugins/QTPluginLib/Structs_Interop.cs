using System;
using System.Drawing;
using System.Runtime.InteropServices;

#pragma warning disable 1591	//stops XML warning


namespace QTPlugin.Interop
{
	[StructLayout( LayoutKind.Sequential )]
	public struct POINT
	{
		public int x;
		public int y;

		public POINT( Point pnt )
		{
			this.x = pnt.X;
			this.y = pnt.Y;
		}

		public Point ToPoint()
		{
			return new Point( x, y );
		}
	}

	[StructLayout( LayoutKind.Sequential )]
	public struct RECT
	{
		public int left;
		public int top;
		public int right;
		public int bottom;

		public RECT( Rectangle rectangle )
		{
			this.left = rectangle.X;
			this.top = rectangle.Y;
			this.right = rectangle.Right;
			this.bottom = rectangle.Bottom;
		}

		public int Width
		{
			get
			{
				return Math.Abs( right - left );
			}
		}

		public int Height
		{
			get
			{
				return bottom - top;
			}
		}

		public Rectangle ToRectangle()
		{
			return new Rectangle( left, top, this.Width, this.Height );
		}
	}

	[StructLayout( LayoutKind.Sequential )]
	public struct MSG
	{
		public IntPtr hwnd;
		public uint message;
		public IntPtr wParam;
		public IntPtr lParam;
		public uint time;
		public POINT pt;
	}

	[StructLayout( LayoutKind.Sequential )]
	public struct FOLDERSETTINGS
	{
		public FOLDERVIEWMODE ViewMode;
		public int fFlags;
	}

	///// <summary>
	///// use StrRetToBuf API to retrieve String from STRRET.
	///// </summary>
	//[StructLayout( LayoutKind.Explicit, Size = 264 )]
	//public struct STRRET
	//{
	//    [FieldOffset( 0 )]
	//    public UInt32 uType;		// One of the STRRET_* values

	//    [FieldOffset( 4 )]
	//    public IntPtr pOleStr;		// Pointer to the string. This memory must be allocated with CoTaskMemAlloc.
	//    //It is the calling application's responsibility to free this memory with CoTaskMemFree when it is no longer needed.
	//    [FieldOffset( 4 )]
	//    public UInt32 uOffset;		// Offset into the item identifier list.

	//    [FieldOffset( 4 )]
	//    public IntPtr cStr;			// Buffer to receive the display name. Size is MAX_PATH.
	//}

	/// <summary>
	/// 
	/// </summary>
	[StructLayout( LayoutKind.Sequential )]
	public struct STRRET
	{
		public UInt32 uType;		// One of the STRRET_* values
		public STRRETinternal data;
	}

	[StructLayout( LayoutKind.Explicit, Size = 260 )]
	public struct STRRETinternal
	{
		[FieldOffset( 0 )]
		public IntPtr pOleStr;		// must be freed by caller of GetDisplayNameOf

		[FieldOffset( 0 )]
		public IntPtr pStr;			// NOT USED

		[FieldOffset( 0 )]
		public UInt32 uOffset;		// Offset into SHITEMID

		[FieldOffset( 0 )]
		public IntPtr cStr;			// Buffer to fill in (ANSI)
	}

	[StructLayout( LayoutKind.Sequential )]
	public struct SHCOLUMNID
	{
		public Guid fmtid;
		public int pid;
	}

	[StructLayout( LayoutKind.Explicit, Size = 16 )]
	public struct VARIANT
	{
		[FieldOffset( 0 )]
		public short vt;

		[FieldOffset( 2 )]
		public short wReserved1;
		[FieldOffset( 4 )]
		public short wReserved2;
		[FieldOffset( 6 )]
		public short wReserved3;

		[FieldOffset( 8 )]
		public byte bValue;

		[FieldOffset( 8 )]
		public short sValue;

		[FieldOffset( 8 )]
		public int iValue;

		[FieldOffset( 8 )]
		public float fValue;

		[FieldOffset( 8 )]
		public long lValue;

		[FieldOffset( 8 )]
		public double dValue;

		[FieldOffset( 8 )]
		public IntPtr pValue;
	}

	[StructLayout( LayoutKind.Sequential )]
	public struct SHELLDETAILS
	{
		public int fmt;
		public int cxChar;
		public STRRET str;
	}

}
