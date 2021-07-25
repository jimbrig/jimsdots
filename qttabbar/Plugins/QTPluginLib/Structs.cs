using System;
using QTPlugin.Interop;
using System.Drawing;
#pragma warning disable 1591	//stops XML warning

namespace QTPlugin
{
	/// <summary>
	/// Address of tab.
	/// At least either of the fields must be specified.
	/// 
	/// QTTabBar give priority to ITEMIDLIST rather than Path if both are not null.
	/// Use GetIDListData/CreatePIDL to convert between pidl and bytes array. 
	/// ITEMIDLIST is always relative to the root of the namespace (the desktop).
	/// 
	/// 1.0.1.3		fixed to create path and ITEMIDLIST
	/// </summary>
	public struct Address
	{
		public byte[] ITEMIDLIST;
		public string Path;

		public Address( IntPtr pidl, string path )
		{
			this.ITEMIDLIST = PInvoke.GetIDListData( pidl );
			this.Path = path;
		}

		public Address( IntPtr pidl )
		{
			this.ITEMIDLIST = PInvoke.GetIDListData( pidl );
			this.Path		= PInvoke.GetPath( pidl );
		}

		public Address( string path )
		{
			this.ITEMIDLIST = PInvoke.GetIDListData( path );
			this.Path = path;
		}

		public Address( byte[] idl, string path )
		{
			this.ITEMIDLIST = idl;
			this.Path = path;
		}
	}
}
