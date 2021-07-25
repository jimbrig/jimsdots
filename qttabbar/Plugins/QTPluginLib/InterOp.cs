using System;
using System.Runtime.InteropServices;
using System.Text;

#pragma warning disable 1591	//stops XML warning

namespace QTPlugin.Interop
{

	[ComImport]
	[InterfaceType( ComInterfaceType.InterfaceIsIUnknown )]
	[Guid( "000214E2-0000-0000-C000-000000000046" )]
	public interface IShellBrowser
	{
		//these 2 methods are from IOleWindow
		[PreserveSig]
		int GetWindow( out IntPtr phwnd );

		[PreserveSig]
		int ContextSensitiveHelp( bool fEnterMode );

		[PreserveSig]
		int InsertMenusSB( IntPtr hmenuShared, IntPtr lpMenuWidths );

		[PreserveSig]
		int SetMenuSB( IntPtr hmenuShared, IntPtr holemenuRes, IntPtr hwndActiveObject );

		[PreserveSig]
		int RemoveMenusSB( IntPtr hmenuShared );

		[PreserveSig]
		int SetStatusTextSB( [MarshalAs( UnmanagedType.BStr )] string pszStatusText );

		[PreserveSig]
		int EnableModelessSB( bool fEnable );

		[PreserveSig]
		int TranslateAcceleratorSB( ref MSG pmsg, ushort wID );

		[PreserveSig]
		int BrowseObject( IntPtr pidl, uint wFlags );

		[PreserveSig]
		int GetViewStateStream(	uint grfMode, IntPtr ppStrm );

		[PreserveSig]
		int GetControlWindow( uint id, [Out] out IntPtr phwnd );

		[PreserveSig]
		int SendControlMsg( uint id, uint uMsg, IntPtr wParam, IntPtr lParam, [Out] out IntPtr pret );

		[PreserveSig]
		int QueryActiveShellView( [Out] out IShellView ppshv );

		[PreserveSig]
		int OnViewWindowActive( IShellView pshv );

		[PreserveSig]
		int SetToolbarItems( IntPtr lpButtons, uint nButtons, uint uFlags );
	}

	[ComImport]
	[InterfaceType( ComInterfaceType.InterfaceIsIUnknown )]
	[Guid( "000214E3-0000-0000-C000-000000000046" )]
	public interface IShellView
	{
		//these 2 methods are from IOleWindow
		[PreserveSig]
		int GetWindow( out IntPtr phwnd );

		[PreserveSig]
		int ContextSensitiveHelp( bool fEnterMode );

		[PreserveSig]
		int TranslateAccelerator( ref MSG pmsg );

		[PreserveSig]
		int EnableModeless( bool fEnable );

		[PreserveSig]
		int UIActivate( uint uState );

		[PreserveSig]
		int Refresh();

		[PreserveSig]
		int CreateViewWindow(
			IShellView psvPrevious,
			ref FOLDERSETTINGS pfs,
			ref IShellBrowser psb,
			ref RECT prcView,
			out IntPtr phWnd );

		[PreserveSig]
		int DestroyViewWindow();

		[PreserveSig]
		int GetCurrentInfo( ref FOLDERSETTINGS lpfs );

		[PreserveSig]
		int AddPropertySheetPages( int dwReserved, IntPtr pfn, IntPtr lparam );

		[PreserveSig]
		int SaveViewState();

		[PreserveSig]
		int SelectItem( IntPtr pidlItem, uint uFlags );

		[PreserveSig]
		int GetItemObject( uint uItem, ref Guid riid, [MarshalAs( UnmanagedType.IUnknown )]out object ppv );
	}

	[ComImport]
	[InterfaceType( ComInterfaceType.InterfaceIsIUnknown )]
	[Guid( "cde725b0-ccc9-4519-917e-325d72fab4ce" )]
	public interface IFolderView
	{
		[PreserveSig]
		int GetCurrentViewMode( ref FOLDERVIEWMODE pViewMode );

		[PreserveSig]
		int SetCurrentViewMode( FOLDERVIEWMODE ViewMode );

		[PreserveSig]
		int GetFolder( ref Guid riid, out IPersistFolder2 ppv );

		[PreserveSig]
		int Item( int iItemIndex, out IntPtr ppidl );

		[PreserveSig]
		int ItemCount( uint uFlags, out int pcItems );

		[PreserveSig]
		int Items( uint uFlags, [In] ref Guid riid, out object ppv );

		[PreserveSig]
		int GetSelectionMarkedItem( out int piItem );

		[PreserveSig]
		int GetFocusedItem( out int piItem );

		[PreserveSig]
		int GetItemPosition( IntPtr pidl, out POINT ppt );

		[PreserveSig]
		int GetSpacing( ref POINT ppt );

		[PreserveSig]
		int GetDefaultSpacing( ref POINT ppt );

		[PreserveSig]
		int GetAutoArrange();

		[PreserveSig]
		int SelectItem( int iItem, int dwFlags );

		[PreserveSig]
		int SelectAndPositionItems( uint cidl, IntPtr apidl, IntPtr apt, int dwFlags );
	}

	[ComImport]
	[InterfaceType( ComInterfaceType.InterfaceIsIUnknown )]
	[Guid( "1AC3D9F0-175C-11d1-95BE-00609797EA4F" )]
	public interface IPersistFolder2
	{
		//IPersist
		[PreserveSig]
		int GetClassID( out Guid pClassID );

		//IPersistFolder
		[PreserveSig]
		int Initialize( IntPtr pidl );

		[PreserveSig]
		int GetCurFolder( out IntPtr ppidl );
	}

	[ComImport]
	[InterfaceType( ComInterfaceType.InterfaceIsIUnknown )]
	[Guid( "000214E6-0000-0000-C000-000000000046" )]
	public interface IShellFolder
	{
		[PreserveSig]
		int ParseDisplayName(
			IntPtr hwnd,
			IntPtr pbc,
			[MarshalAs( UnmanagedType.LPWStr )] String pszDisplayName,
			ref uint pchEaten,
			out IntPtr ppidl,
			ref uint pdwAttributes );

		[PreserveSig]
		int EnumObjects( IntPtr hwnd, int grfFlags, out IEnumIDList ppenumIDList );

		[PreserveSig]
		int BindToObject(
			IntPtr pidl,
			IntPtr pbc,
			[In] ref Guid riid,
			[Out, MarshalAs( UnmanagedType.Interface )] out object ppv );

		[PreserveSig]
		int BindToStorage(
			IntPtr pidl,
			IntPtr pbc,
			[In] ref Guid riid,
			[Out, MarshalAs( UnmanagedType.Interface )] out object ppv );

		[PreserveSig]
		int CompareIDs( IntPtr lParam, IntPtr pidl1, IntPtr pidl2 );

		[PreserveSig]
		int CreateViewObject(
			IntPtr hwndOwner,
			[In] ref Guid riid,
			[Out, MarshalAs( UnmanagedType.Interface )] out object ppv );

		[PreserveSig]
		int GetAttributesOf(
			uint cidl,
			[MarshalAs( UnmanagedType.LPArray, SizeParamIndex = 0 )]
			IntPtr[] apidl,
			ref uint rgfInOut );

		[PreserveSig]
		int GetUIObjectOf(
			IntPtr hwndOwner,
			uint cidl,
			[MarshalAs( UnmanagedType.LPArray, SizeParamIndex = 1 )]
			IntPtr[] apidl,
			[In] ref Guid riid,
			ref uint rgfReserved,
			[Out, MarshalAs( UnmanagedType.Interface )] out object ppv );

		[PreserveSig]
		int GetDisplayNameOf( IntPtr pidl, uint uFlags, out STRRET pName );

		[PreserveSig]
		int SetNameOf(
			IntPtr hwndOwner,
			IntPtr pidl,
			[MarshalAs( UnmanagedType.LPWStr )]
			string pszName,
			uint uFlags,
			out IntPtr ppidlOut );
	}

	[ComImport]
	[InterfaceType( ComInterfaceType.InterfaceIsIUnknown )]
	[Guid( "93F2F68C-1D1B-11d3-A30E-00C04F79ABD1" )]
	public interface IShellFolder2
	{
		// IShellFolder

		[PreserveSig]
		int ParseDisplayName(
			IntPtr hwnd,
			IntPtr pbc,
			[MarshalAs( UnmanagedType.LPWStr )] String pszDisplayName,
			ref uint pchEaten,
			out IntPtr ppidl,
			ref uint pdwAttributes );

		[PreserveSig]
		int EnumObjects( IntPtr hwnd, int grfFlags, out IEnumIDList ppenumIDList );

		[PreserveSig]
		int BindToObject(
			IntPtr pidl,
			IntPtr pbc,
			[In] ref Guid riid,
			[Out, MarshalAs( UnmanagedType.Interface )] out object ppv );

		[PreserveSig]
		int BindToStorage(
			IntPtr pidl,
			IntPtr pbc,
			[In] ref Guid riid,
			[Out, MarshalAs( UnmanagedType.Interface )] out object ppv );

		[PreserveSig]
		int CompareIDs( IntPtr lParam, IntPtr pidl1, IntPtr pidl2 );

		[PreserveSig]
		int CreateViewObject(
			IntPtr hwndOwner,
			[In] ref Guid riid,
			[Out, MarshalAs( UnmanagedType.Interface )] out object ppv );

		[PreserveSig]
		int GetAttributesOf(
			uint cidl,
			[MarshalAs( UnmanagedType.LPArray, SizeParamIndex = 0 )]
			IntPtr[] apidl,
			ref uint rgfInOut );

		[PreserveSig]
		int GetUIObjectOf(
			IntPtr hwndOwner,
			uint cidl,
			[MarshalAs( UnmanagedType.LPArray, SizeParamIndex = 1 )]
			IntPtr[] apidl,
			[In] ref Guid riid,
			ref uint rgfReserved,
			[Out, MarshalAs( UnmanagedType.Interface )] out object ppv );

		[PreserveSig]
		int GetDisplayNameOf( IntPtr pidl, uint uFlags, out STRRET pName );

		[PreserveSig]
		int SetNameOf(
			IntPtr hwndOwner,
			IntPtr pidl,
			[MarshalAs( UnmanagedType.LPWStr )]
			string pszName,
			uint uFlags,
			out IntPtr ppidlOut );

		// IShellFolder2

		[PreserveSig]
		int GetDefaultSearchGUID( out Guid pguid );

		[PreserveSig]
		int EnumSearches( out IntPtr ppenum );

		[PreserveSig]
		int GetDefaultColumn( int dwRes, out uint pSort, out uint pDisplay );

		[PreserveSig]
		int GetDefaultColumnState( int iColumn, out uint pcsFlags );

		[PreserveSig]
		int GetDetailsEx(
			IntPtr pidl,
			[In]ref SHCOLUMNID pscid,
			out VARIANT pv );

		[PreserveSig]
		int GetDetailsOf(
			IntPtr pidl,
			int iColumn,
			out SHELLDETAILS psd );

		[PreserveSig]
		int MapColumnToSCID(
			int iColumn,
			out SHCOLUMNID pscid );
	}

	[ComImport]
	[InterfaceType( ComInterfaceType.InterfaceIsIUnknown )]
	[Guid( "000214F2-0000-0000-C000-000000000046" )]
	public interface IEnumIDList
	{
		[PreserveSig]
		int Next(
			uint celt,
			out IntPtr rgelt,
			out IntPtr pceltFetched );

		[PreserveSig]
		int Skip( uint celt );

		[PreserveSig]
		int Reset();

		[PreserveSig]
		int Clone( out IEnumIDList ppenum );
	}


	public enum FOLDERVIEWMODE
	{
		FVM_ICON		= 1,
		FVM_SMALLICON	= 2,
		FVM_LIST		= 3,
		FVM_DETAILS		= 4,
		FVM_THUMBNAIL	= 5,
		FVM_TILE		= 6,
		FVM_THUMBSTRIP	= 7,
	}


	public static class PInvoke
	{
		[DllImport( "shell32.dll" )]
		public static extern uint ILGetSize( IntPtr pidl );

		[DllImport( "shell32.dll" )]
		public static extern IntPtr ILClone( IntPtr pidl );

		[DllImport( "shell32.dll", CharSet = CharSet.Unicode )]
		public static extern IntPtr ILCreateFromPath( string pszPath );
		
		[DllImport( "shlwapi.dll", CharSet = CharSet.Unicode )]
		public static extern int StrRetToBuf( ref STRRET pstr, IntPtr pidl, System.Text.StringBuilder pszBuf, uint cchBuf );

		[DllImport( "shell32.dll", CharSet = CharSet.Unicode )]
		public static extern bool SHGetPathFromIDList( IntPtr pidl, StringBuilder pszPath );

		[DllImport( "shell32.dll" )]
		public static extern int SHBindToParent( IntPtr pidl, [In, MarshalAs( UnmanagedType.LPStruct )] Guid riid, out IShellFolder ppv, out IntPtr ppidlLast );

		[DllImport( "shell32.dll" )]
		public static extern int SHBindToObject( IShellFolder psf, IntPtr pidl, IntPtr pbc, [In, MarshalAs( UnmanagedType.LPStruct )] Guid riid, [Out, MarshalAs( UnmanagedType.Interface )] out object ppv );


		/// <summary>
		/// Copy binary data of ITEMIDLIST structure from pointer.
		/// </summary>
		/// <param name="pidl">pointer to ITEMIDLIST</param>
		/// <returns>raw binary data of ITEMIDLIST structure</returns>
		public static byte[] GetIDListData( IntPtr pidl )
		{
			if( pidl != IntPtr.Zero )
			{
				uint size = ILGetSize( pidl );
				
				if( size != 0 )
				{
					byte[] buffer = new byte[size];
					Marshal.Copy( pidl, buffer, 0, (int)size );
					return buffer;
				}
			}
			return null;
		}

		/// <summary>
		/// Get binary data of ITEMIDLIST structure from path string.
		/// </summary>
		/// <param name="path">path string</param>
		/// <returns></returns>
		public static byte[] GetIDListData( string path )
		{
			IntPtr pidl = ILCreateFromPath( path );
			if( pidl != IntPtr.Zero )
			{
				byte[] idl = GetIDListData( pidl );
				Marshal.FreeCoTaskMem( pidl );
				return idl;
			}
			return null;
		}

		/// <summary>
		/// Creates ITEMIDLIST structure from binary data and returns a pointer to it.
		/// Required freeing returned pointer by Marshal.FreeCoTaskMem, CoTaskMemFree.
		/// </summary>
		public static IntPtr CreatePIDL( byte[] data )
		{
			if( data == null || data.Length == 0 )
				return IntPtr.Zero;

			int size = data.Length;

			IntPtr pidl = IntPtr.Zero;
			try
			{
				pidl = Marshal.AllocCoTaskMem( size );
			}
			catch
			{
				return IntPtr.Zero;
			}
			Marshal.Copy( data, 0, pidl, size );
			return pidl;
		}

		/// <summary>
		/// Convert PIDL to string path.
		/// </summary>
		public static string GetPath( IntPtr pidl )
		{
			if( pidl != IntPtr.Zero )
			{
				StringBuilder sb = new StringBuilder( 260 );
				if( PInvoke.SHGetPathFromIDList( pidl, sb ) )
				{
					return sb.ToString();
				}
				else
				{
					return GetDisplayName( pidl, false );
				}
			}
			return String.Empty;
		}

		/// <summary>
		/// Convert PIDL to path or display name
		/// </summary>
		public static string GetDisplayName( IntPtr pidl, bool fDisplayName )
		{
			const uint SHGDN_FORPARSING = 0x8000;
			const uint SHGDN_NORMAL = 0;
			//const uint STRRET_CSTR = 0x2;

			IShellFolder shellFolder = null;
			try
			{
				IntPtr pidlLast;
				if( 0 == PInvoke.SHBindToParent( pidl, IID_IShellFolder, out shellFolder, out pidlLast ) && shellFolder != null )
				{
					uint shgdn = fDisplayName ? SHGDN_NORMAL : SHGDN_FORPARSING;
					StringBuilder sb = new StringBuilder( 260 );
					STRRET pSTRRET;
					//pSTRRET.uType = STRRET_CSTR;

					if( 0 == shellFolder.GetDisplayNameOf( pidlLast, shgdn, out pSTRRET ) )
					{
						StrRetToBuf( ref pSTRRET, pidlLast, sb, (uint)sb.Capacity );
					}

					return sb.ToString();
				}
			}
			finally
			{
				if( shellFolder != null )
				{
					Marshal.ReleaseComObject( shellFolder );
				}
			}

			return String.Empty;
		}

		public static readonly Guid IID_IShellFolder = new Guid( "000214E6-0000-0000-C000-000000000046" );
	}
}