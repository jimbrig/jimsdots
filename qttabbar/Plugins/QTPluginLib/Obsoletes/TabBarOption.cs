using System;
using System.Collections.Generic;
using System.Drawing;
#pragma warning disable 1591	//stops XML warning

namespace QTPlugin
{
	// delete pending.

	[Obsolete( "This class is about to be removed. Do not use this." )]
	public class TabBarOption
	{
		public TabBarOption()
		{
		}

		public TabBarOption( Dictionary<int, object> option_value_pairs )
		{
		}



		public void SetValue( TabBar_Options_Boolean option, bool value )
		{
		}

		public void SetValue( TabBar_Options_Int option, int value )
		{
		}

		public void SetValue( TabBar_Options_String option, string value )
		{
		}

		public void SetValue( TabBar_Options_Color option, Color value )
		{
		}

		public void SetValue( TabBar_Options_Misc option, object value )
		{
		}

		public void SetValues( Dictionary<int, object> option_value_pairs )
		{
		}



		public bool TryGetValue( TabBar_Options_Boolean option, out bool value )
		{
			value = false;
			return false;
		}

		public bool TryGetValue( TabBar_Options_Int option, out int value )
		{
			value = 0;
			return false;
		}

		public bool TryGetValue( TabBar_Options_String option, out string value )
		{
			value = null;
			return false;
		}

		public bool TryGetValue( TabBar_Options_Color option, out Color value )
		{
			value = Color.Empty;
			return false;
		}

		public bool TryGetValue( TabBar_Options_Misc option, out object value )
		{
			value = null;
			return false;
		}

		public Dictionary<int, object> Dictionary
		{
			get
			{
				return null;
			}
		}
	}

	[Obsolete( "This class is about to be removed. Do not use this.", true )]
	public enum TabBar_Options_Boolean
	{
		//bool 
		ActivateNew = 0,
		ReuseTab,
		CloseAllOnGroup,
		Tooltip,
		XButtons,
		NavButtons,
		TabHistory,
		RecentFiles,
		DragDrop,
		RenameAmbiguous,
		MiddleClickFolder,
		UpOneLevelOnDblClick,
		NoWindowResize,
		SaveTransparency,
		CaptureProcess,
		ShowFolderTreeOnNewProcess,
		NoCaptureWindow,
		HScrollShiftWheel,
		ChangeViewModeCtrlWheel,
		NoCloseWindow,
		NoCloseLocked,
		RestoreTabs,
		RestoreLocked,
		UseTabSkin,
		ShowFolderIcon,
		ActiveTabFontBold,
		DrawToolBarBackground,
		HideMenuBar,
		XPCompatibleBSKey,
		FullRowSelect,
		GridLines,
		ListViewAlternateColor,
		ShowPreviewTip,
		PreviewTipMode_ShiftKey,
		ShowSubDirTip,
		SubDirTipMode_ShiftKey,
		SubDirTipMode_PreviewTip,
		SubDirTipMode_HiddenFiles,
		SubDirTipMode_SystemFiles,
		SubDirTipMode_Files,
		SelectionOnRenaming,
		SendToTrayOnClose,
	}

	[Obsolete( "This class is about to be removed. Do not use this.", true )]
	public enum TabBar_Options_Int
	{
		//int
		NavButtonPosition = 0x10000,
		TabHistoryMax,
		NewTabLocation,
		ActiveTabOnClose,
		TabDoubleClicked,
		BarDoubleClicked,
		MultipleRows,
		MiddleClickFolderAction,
		TabHeight,
		TabWidthMode,
		TabWidthFixed,
		TabWidthMax,
		TabWidthMin,
		PreviewTipMaxWidth,
		PreviewTipMaxHeight,
	}

	[Obsolete( "This class is about to be removed. Do not use this.", true )]
	public enum TabBar_Options_String
	{
		//string
		LanguageFilePath = 0x20000,
		BarDoubleClickedPath,
		TabSkinPath,
		TabFontFamilyName,
		PluginLanguageFilePath,
	}

	[Obsolete( "This class is about to be removed. Do not use this.", true )]
	public enum TabBar_Options_Color
	{
		//Color
		TabTitleActiveColor = 0x40000,
		TabTitleInctiveColor,
		ToolbarBackgroundColor,
		AlternateTextColor,
		AlternateBackgourndColor,
		ClassicHiliteColor,
	}

	[Obsolete( "This class is about to be removed. Do not use this.", true )]
	public enum TabBar_Options_Misc
	{
		//other 
		TabSkinMargins = 0x80000,			//System.Windows.Forms.Padding
		TabFontSize,						//float
		PreviewTipTextExtensions,			//string[]
	}
	
}